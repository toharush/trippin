import { GoogleDatabase } from "../interface/google";
import { get_google_by_id, insert_google, update_google } from "../models/google";

export const upsert_google = async(googleDatabaseInput: GoogleDatabase) => {
    const res: number = await get_google_by_id(googleDatabaseInput.placeId);

    if(res > 0) {
        await update_google(googleDatabaseInput);
    } else {
        await insert_google(googleDatabaseInput);
    }
}
