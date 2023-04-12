import { query } from "./query";
import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { GoogleDatabase } from "../interface/google";

export const insert_google = async (googleDatabaseInput: GoogleDatabase) => {
  googleDatabaseInput.created_at = new Date();
  googleDatabaseInput.updated_at = new Date();

  const res = await query(
    `INSERT INTO ${schema}.${TABLES.GOOGLE}("place_id", ${Object.keys(
      googleDatabaseInput
    )
      .filter((key) => key != "place_id")
      .map((key: string, index: number) => `${key}`)}) 
    VALUES ($1, ${Object.keys(googleDatabaseInput)
      .filter((key) => key != "place_id")
      .map(
        (key: string, index: number) => `$${index + 2}`
      )}) ON CONFLICT ("place_id") DO UPDATE SET ${Object.keys(
      googleDatabaseInput
    )
      .filter((key) => key != "place_id")
      .map((key: string) => `${key}=EXCLUDED.${key} `)} RETURNING "place_id";`,

    Object.values(googleDatabaseInput)
  );

  if (res && res.rowCount > 0) {
    return res.rows[0].place_id || QueryResult.FIELD_NOT_FOUND;
  }
  return QueryResult.COLUMN_NOT_FOUND;
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
