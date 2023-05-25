import {
  insert_position,
  get_position_id as get_position_id_db,
} from "../models/position";

export const get_position_id = async (
  lat: number,
  lng: number
): Promise<number> => {
  const res = await get_position_id_db(lat, lng);

  if (res < 0) {
    return await insert_position(lat, lng);
  }

  return res;
};
