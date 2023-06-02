import {
  get_places as get_places_db,
  get_place_by_id,
  get_place_count as get_place_count_db,
  insert_place as insert_place_db,
} from "../models/place";
import hash from "object-hash";
import { DiscoverResponse } from "../utils/here-api/app";
import { get_address_id } from "./address";
import { get_category_id } from "./category";
import { set_categories } from "./extra_categories";
import { get_position_id } from "./position";
import {
  defaultCategories,
  defaultGoogleRandomRate,
  defaultGoogleRandomSpend,
  defaultPosition,
} from "../utils/database/config";
import { upsert_google } from "./google";
import { getGoogleImage } from "../utils/randomLocation";

export const get_places = async (limit: number, offset: number = 0) =>
  await get_places_db(limit, limit * offset);

export const get_place_count = async () => await get_place_count_db();

export const insert_place = async (item: DiscoverResponse) => {
  const rate = defaultGoogleRandomRate();
  const spend = defaultGoogleRandomSpend();
  const picture = await getGoogleImage(item.title);

  let category = defaultCategories;
  let address = null;
  let openHours = null;
  let pos = await get_position_id(item.position.lat, item.position.lng);

  if (!pos) {
    pos = defaultPosition;
  }

  if (item.ontologyId) {
    category = await get_category_id(item.ontologyId);
  }

  if (item.address?.label) {
    address = await get_address_id(
      item.address.label,
      item.address.countryCode || null,
      item.address.countryName || null,
      item.address.state || null,
      item.address.city || null,
      item.address.district || null,
      item.address.street || null,
      item.address.postalCode || null
    );
  }

  await item.categories?.map(async (cat) =>
    set_categories(cat.name, item.id, cat.primary)
  );

  let place = await get_place_by_id(item.id);

  if (place < 0) {
    place = await insert_place_db(
      item.id,
      item.title,
      item.resultType,
      openHours,
      item.data_version || hash.sha1(item),
      new Date(),
      pos,
      category,
      address
    );
    await upsert_google({
      place_id: item.id,
      rate,
      spend,
      image_url: picture,
    });
    console.log(place);
  }

  return place;
};
