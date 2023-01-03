import { Google } from "../interface/google";
import { upsert_google as upsert_google_db} from "../models/google";

export const upsert_google = async(place_id: string, rate?: number, spend?: string) => {
    let googleDatabaseInput: Partial<Google> = {
        place_id: place_id
    }

    if(rate) googleDatabaseInput.rate = rate;
    if(spend) googleDatabaseInput.spend = spend;

   return await upsert_google_db(googleDatabaseInput);
}
