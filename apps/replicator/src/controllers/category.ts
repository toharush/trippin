import { get_category_by_name, upsert_category_db } from "../models/category";

export const get_category_id = async (name: string): Promise<number> =>
  await upsert_category_db(name);
