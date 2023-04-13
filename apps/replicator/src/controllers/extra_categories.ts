import {
  upsert_categories_db,
} from "../models/extra_categories";
import { get_category_id } from "./category";

export const set_categories = async (
  name: string | undefined,
  id: string,
  primary: boolean = false
) => {
  if (name) {
    const catId = await get_category_id(name);
    return await upsert_categories_db(id, catId, primary);
  }
};
