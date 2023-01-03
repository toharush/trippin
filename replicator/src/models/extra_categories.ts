import { ExtraCategories } from "../interface/extra_categories";
import { TABLES } from "../utils/database/config";
import { create_upsert_query, query } from "./query";

export const upsert_categories = async(category: ExtraCategories) => {
    const q = create_upsert_query(category, TABLES.EXTRA_CATEGORIES, ["place_id", "category_id"]);
    return await query(q.query, q.values);
}
