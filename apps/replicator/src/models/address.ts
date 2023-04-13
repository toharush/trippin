import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { query } from "./query";

export const upsert_address_db = async (
  label: string,
  country_code: string | null,
  country_name: string | null,
  state: string | null,
  city: string | null,
  district: string | null,
  street: string | null,
  postal_code: string | null
): Promise<number> => {
  return await (
    await query(
      `INSERT INTO ${schema}.${TABLES.ADDRESS}
      (label, "country_code", "country_name", state, city, district, street, "postal_code") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (label) DO UPDATE SET district=EXCLUDED.district RETURNING id`,
      [
        label,
        country_code,
        country_name,
        state,
        city,
        district,
        street,
        postal_code,
      ]
    )
  ).rows[0]?.id;
};

export const get_address_id_by_label = async (
  label: string
): Promise<number> => {
  const res = await await query(
    `SELECT id FROM ${schema}.${TABLES.ADDRESS} WHERE label=$1`,
    [label]
  );

  if (res && res.rowCount > 0) {
    return res.rows[0]?.id || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
};
