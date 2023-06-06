import { get_categories, insert_categories } from "../models/extra_categories";
import { get_category_id } from "./category";

export const set_categories = async (
  name: string | undefined,
  id: string,
  primary: boolean = false
) => {
  if (name) {
    const catId = await get_category_id(name);
    if ((await get_categories(id, catId)) < 0) {
      insert_categories(id, catId, primary);
    }
  }
};
