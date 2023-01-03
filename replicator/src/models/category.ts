import { TABLES } from "../utils/database/config";
import { create_upsert_query, query } from "./query";

export const upsert_category = async(name: string, is_primary: boolean): Promise<number> => {
    const q = create_upsert_query({name: name, is_primary: is_primary}, TABLES.CATEGORY, ["id"]);
    return await (await query(`${q.query} RETURNING id`, q.values)).rows[0]?.id;
}