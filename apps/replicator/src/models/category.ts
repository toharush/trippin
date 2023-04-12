import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { query } from "./query";

export const insert_category = async (name: string): Promise<number> => {
  return await (
    await query(
      `INSERT INTO ${schema}.${TABLES.CATEGORY}(name) VALUES ($1) RETURNING id`,
      [name]
    )
  ).rows[0]?.id;
};

export const get_category_by_name = async (name: string): Promise<number> => {
  const res = await await query(
    `SELECT id FROM ${schema}.${TABLES.CATEGORY} WHERE LOWER(name) = LOWER($1)`,
    [name]
  );

  if (res.rowCount > 0) {
    return res.rows[0]?.id || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
};
