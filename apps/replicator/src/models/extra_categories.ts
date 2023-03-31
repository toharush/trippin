import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { query } from "./query";

export const insert_categories = async(placeId: string, categoryId: number, primary: boolean) => {
    return await query(`INSERT INTO ${schema}.${TABLES.EXTRA_CATEGORIES}("placeId", "categoryId", "primary") VALUES ($1, $2, $3)`, [placeId, categoryId, primary]);
}

export const get_categories = async(placeId: string, categoryId: number) => {
    const res = await (await query(`SELECT * FROM ${schema}.${TABLES.EXTRA_CATEGORIES} WHERE "placeId"=$1 AND "categoryId"=$2;`, [placeId, categoryId]));

    if(res && res.rowCount > 0) {
        return res.rows[0] || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}