import client, { QueryResult, schema } from "../utils/database/client";
import logger from "../utils/logger/logger";
import { GoogleDatabaseInput } from "./google";

export const insert_category = async(name: string): Promise<number> => {
    return await (await query(`INSERT INTO ${schema}.category(name) VALUES ($1) RETURNING id`, [name])).rows[0]?.id;
}

export const get_category_by_name = async(name: string): Promise<number> => {
    const res = await (await query(`SELECT id FROM ${schema}.category WHERE LOWER(name) = LOWER($1)`, [name]));

    if(res.rowCount > 0) {
        return res.rows[0]?.id || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const insert_position = async(lat: number, lng: number): Promise<number>  => {
    return await (await query(`INSERT INTO ${schema}.position(lat, lng) VALUES ($1, $2) RETURNING id`, [lat, lng])).rows[0]?.id;
}

export const get_position_id = async(lat: number, lng: number): Promise<number> => {
    const res = await (await query(`SELECT id FROM ${schema}."position" WHERE lat=$1 AND lng=$2`, [lat, lng]));

    if(res && res.rowCount > 0) {
        return res.rows[0]?.id || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const insert_address = async(label: string, countryCode: string | null, countryName: string | null, state: string | null, city: string | null, district: string | null, street: string | null, postalCode: string | null): Promise<number>  => {
    return await (await query(`INSERT INTO trippin.address(label, "countryCode", "countryName", state, city, district, street, "postalCode") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [label, countryCode, countryName, state, city, district, street, postalCode])).rows[0]?.id;
}

export const get_address_id_by_label = async(label: string): Promise<number> => {
    const res = await (await query(`SELECT id FROM ${schema}."address" WHERE label=$1`, [label]));

    if(res && res.rowCount > 0) {
        return res.rows[0]?.id || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const insert_place = async(id: string, title: string, type: string, open_hours: any | null, data_version: string, created_at: Date, positionId: number | null , categoryId: number | null, address: number | null) => {
    return await (await query(`INSERT INTO ${schema}.place(id, title, type, open_hours, data_version, created_at, updated_at, "positionId", "categoryId", "addressId") VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8, $9) RETURNING id`,
     [id, title, type, open_hours , data_version, created_at, positionId, categoryId, address])).rows[0]?.id;
}

export const get_place_by_id = async(id: string) => {
    const res = await (await query(`SELECT * FROM ${schema}.place WHERE id = $1`, [id]));

    if(res && res.rowCount > 0) {
        return res.rows[0] || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const insert_categories = async(placeId: string, categoryId: number, primary: boolean) => {
    return await query(`INSERT INTO ${schema}.extra_categories("placeId", "categoryId", "primary") VALUES ($1, $2, $3)`, [placeId, categoryId, primary]);
}

export const get_categories = async(placeId: string, categoryId: number) => {
    const res = await (await query(`SELECT * FROM ${schema}.extra_categories WHERE "placeId"=$1 AND "categoryId"=$2;`, [placeId, categoryId]));

    if(res && res.rowCount > 0) {
        return res.rows[0] || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const get_places = async(limit: number, offset: number): Promise<{id: string, addressId: number, label: string}[]> => {
    return await (await query(`SELECT id, "addressId", (SELECT "label" FROM ${schema}.address WHERE address."id" = "addressId") as label FROM ${schema}.place ORDER BY place."updated_at"  LIMIT $1 OFFSET $2;`, [limit, offset])).rows;
}

export const get_place_count = async(): Promise<number> => {
    const res = await (await query(`SELECT COUNT(id) FROM ${schema}.place`, []));

    if(res && res.rowCount > 0) {
        return res.rows[0].count || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const insert_google = async(googleDatabaseInput: GoogleDatabaseInput) => {
    googleDatabaseInput.created_at = new Date();
    googleDatabaseInput.updated_at = new Date();

    const res = await query(`INSERT INTO ${schema}.google("placeId", ${Object.keys(googleDatabaseInput).filter(key => key != "placeId").map((key: string, index: number) => `${key}`)}) 
    VALUES ($1, ${Object.keys(googleDatabaseInput).filter(key => key != "placeId").map((key: string, index: number) => `$${index+2}`)}) RETURNING "placeId";`, Object.values(googleDatabaseInput));

    if(res && res.rowCount > 0) {
        return res.rows[0].placeId || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const update_google = async(googleDatabaseInput: GoogleDatabaseInput) => {
    googleDatabaseInput.updated_at = new Date();

    const res = await query(`UPDATE ${schema}.google SET ${Object.keys(googleDatabaseInput).filter(key => key != "placeId").map((key: string, index: number) => `${key}=$${index+2} `)}WHERE "placeId" = $1 RETURNING "placeId"`, Object.values(googleDatabaseInput));
    
    if(res && res.rowCount > 0) {
         return res.rows[0].placeId || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const get_google_by_id = async(placeId: string) => {
    return await (await query(`SELECT * FROM ${schema}.google WHERE "placeId" = $1`, [placeId])).rowCount
}


const query = async(query: string, values: any[]) => {
    try {
        return await (await client.query(query, values));
    } catch (err) {
        logger.error(err)
        return {
            rows: [],
            rowCount: 0
        }
    }
}
