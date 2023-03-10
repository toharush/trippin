import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { query } from "./query";

export const get_places = async(limit: number, offset: number): Promise<{id: string, addressId: number, label: string}[]> => {
    return await (await query(`SELECT id, "addressId", (SELECT "label" FROM ${schema}.${TABLES.ADDRESS} WHERE address."id" = "addressId") as label 
    FROM ${schema}.${TABLES.PLACE} ORDER BY place."updated_at" LIMIT $1 OFFSET $2;`, [limit, offset])).rows;
}

export const get_place_count = async(): Promise<number> => {
    const res = await (await query(`SELECT COUNT(id) FROM ${schema}.${TABLES.PLACE}`, []));

    if(res && res.rowCount > 0) {
        return res.rows[0].count || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const insert_place = async(id: string, title: string, type: string, open_hours: any | null, data_version: string, created_at: Date, positionId: number | null , categoryId: number | null, address: number | null) => {
    return await (await query(`INSERT INTO ${schema}.${TABLES.PLACE}(id, title, type, open_hours, data_version, created_at, updated_at, "positionId", "categoryId", "addressId") VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8, $9) RETURNING id`,
     [id, title, type, open_hours , data_version, created_at, positionId, categoryId, address])).rows[0]?.id;
}

export const get_place_by_id = async(id: string) => {
    const res = await (await query(`SELECT * FROM ${schema}.${TABLES.PLACE} WHERE id = $1`, [id]));

    if(res && res.rowCount > 0) {
        return res.rows[0] || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}