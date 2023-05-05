import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { Position } from "../utils/here-api/app";
import { query } from "./query";

export const get_places = async (
  limit: number,
  offset: number
): Promise<{
  id: string;
  address_id: number;
  label: string;
  lat: number;
  lng: number;
}[]> => {
  return await (
    await query(
      `SELECT id, "address_id", (SELECT "label" FROM ${schema}.${TABLES.ADDRESS} WHERE address."id" = "address_id") as label,
      (SELECT "lat" FROM ${schema}.${TABLES.POSITION} WHERE position."id" = "position_id") as lat,
      (SELECT "lng" FROM ${schema}.${TABLES.POSITION} WHERE position."id" = "position_id") as lng 
    FROM ${schema}.${TABLES.PLACE} ORDER BY place."updated_at" LIMIT $1 OFFSET $2;`,
      [limit, offset]
    )
  ).rows;
};

export const get_place_count = async (): Promise<number> => {
  const res = await await query(
    `SELECT COUNT(id) FROM ${schema}.${TABLES.PLACE}`,
    []
  );

  if (res && res.rowCount > 0) {
    return res.rows[0].count || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
};
export interface upsert_place_db_props {
  id: string;
  title: string;
  type: string;
  open_hours: any | null;
  data_version: string;
  created_at: Date;
  updated_at: Date;
  position_id: number | null;
  category_id: number | null;
  address_id: number | null;
}
export const upsert_place_db = async (props: upsert_place_db_props) => {
  return await (
    await query(
      `INSERT INTO ${schema}.${TABLES.PLACE}
      (id, title, type, open_hours, data_version, created_at, updated_at, "position_id", "category_id", "address_id")
       VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8, $9) 
       ON CONFLICT ("id") 
       DO UPDATE SET 
       ${Object.keys(props)
         .filter((key) => key != "id" && key != "created_at")
         .map((key: string) => `${key}=EXCLUDED.${key} `)}
       RETURNING id`,
      [
        props.id,
        props.title,
        props.type,
        props.open_hours,
        props.data_version,
        props.created_at,
        props.position_id,
        props.category_id,
        props.address_id,
      ]
    )
  ).rows[0]?.id;
};

export const get_place_by_id = async (id: string) => {
  const res = await await query(
    `SELECT * FROM ${schema}.${TABLES.PLACE} WHERE id = $1`,
    [id]
  );

  if (res && res.rowCount > 0) {
    return res.rows[0] || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
};
