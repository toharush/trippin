import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { query } from "./query";

export const upsert_categories_db = async (
  place_id: string,
  category_id: number,
  primary: boolean
) => {
  return await query(
    `INSERT INTO ${schema}.${TABLES.EXTRA_CATEGORIES}("place_id", "category_id", "primary") VALUES ($1, $2, $3) 
    ON CONFLICT ("place_id", "category_id") DO UPDATE SET "primary"=EXCLUDED."primary" RETURNING *`,
    [place_id, category_id, primary]
  );
};

export const get_categories = async (place_id: string, category_id: number) => {
  const res = await await query(
    `SELECT * FROM ${schema}.${TABLES.EXTRA_CATEGORIES} WHERE "place_id"=$1 AND "category_id"=$2;`,
    [place_id, category_id]
  );

  if (res && res.rowCount > 0) {
    return res.rows[0] || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
};
