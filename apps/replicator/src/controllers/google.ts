import { GoogleDatabase } from "../interface/google";
import { insert_google } from "../models/google";

export const upsert_google = async (googleDatabaseInput: GoogleDatabase) =>
  await insert_google(googleDatabaseInput);
