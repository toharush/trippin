import { GoogleDatabase } from "../interface/google";
import { upsert_google_db } from "../models/google";

export const upsert_google = async (googleDatabaseInput: GoogleDatabase) => {
  await upsert_google_db(googleDatabaseInput);
};
