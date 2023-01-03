import { create_upsert_query, query } from "./query";
import { QueryResult } from "../utils/database/client";
import { TABLES } from "../utils/database/config";
import { Google } from "../interface/google";

export const upsert_google = async(googleDatabaseInput: Partial<Google>): Promise<number> => {
    googleDatabaseInput.updated_at = new Date();

    const insertQuery = create_upsert_query(googleDatabaseInput, TABLES.GOOGLE, ["place_id"]);

    const res = await query(`${insertQuery.query} RETURNING "place_id"`, insertQuery.values);

    if(res && res.rowCount > 0) {
        return res.rows[0].placeId|| QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}
