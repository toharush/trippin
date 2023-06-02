import { query } from "./query";
import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { GoogleDatabase } from "../interface/google";

export const insert_google = async (googleDatabaseInput: GoogleDatabase) => {
  googleDatabaseInput.created_at = new Date();
  googleDatabaseInput.updated_at = new Date();

  const q = `INSERT INTO trippin.google(
    place_id, rate, spend, image_url, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6);`;
  try {
    await query(q, [
      googleDatabaseInput.place_id,
      googleDatabaseInput.rate,
      googleDatabaseInput.spend,
      googleDatabaseInput.image_url,
      googleDatabaseInput.created_at,
      googleDatabaseInput.updated_at,
    ]);
  } catch (err) {
    console.log(err);
  }
};

export const update_google = async (googleDatabaseInput: GoogleDatabase) => {
  googleDatabaseInput.updated_at = new Date();

  const res = await query(
    `UPDATE ${schema}.${TABLES.GOOGLE} SET ${Object.keys(googleDatabaseInput)
      .filter((key) => key != "place_id")
      .map(
        (key: string, index: number) => `${key}=$${index + 2} `
      )}WHERE "place_id" = $1 RETURNING "place_id"`,
    Object.values(googleDatabaseInput)
  );

  if (res && res.rowCount > 0) {
    return res.rows[0].place_id || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
};

export const get_google_by_id = async (place_id: string) => {
  return await (
    await query(
      `SELECT * FROM ${schema}.${TABLES.GOOGLE} WHERE "place_id" = $1`,
      [place_id]
    )
  ).rowCount;
};
