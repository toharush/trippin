import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { query } from "./query";

export const insert_position = async (
  lat: number,
  lng: number
): Promise<number> => {
  return await (
    await query(
      `INSERT INTO ${schema}.${TABLES.POSITION}(lat, lng) VALUES ($1, $2) RETURNING id`,
      [lat, lng]
    )
  ).rows[0]?.id;
};

export const get_position_id = async (
  lat: number,
  lng: number
): Promise<number> => {
  const res = await await query(
    `SELECT id FROM ${schema}.${TABLES.POSITION} WHERE lat=$1 AND lng=$2`,
    [lat, lng]
  );

  if (res && res.rowCount > 0) {
    return res.rows[0]?.id || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
};

export const getAllPositionsFromDb = async (): Promise<{
  lat: number;
  lng: number;
}[]> => {
  const res = await await query(
    `SELECT lat, lng FROM ${schema}.${TABLES.POSITION}`,
    []
  );

  return res.rows;
};
