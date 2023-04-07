import { GoogleDatabase } from "../interface/google";
import {
  get_google_by_id,
  insert_google,
  update_google,
} from "../models/google";

export const upsert_google = async (googleDatabaseInput: GoogleDatabase) => {
  await insert_google(googleDatabaseInput);
};
