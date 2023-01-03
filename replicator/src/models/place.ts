import { Place } from "../interface/place";
import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { create_upsert_query, query } from "./query";

export const get_places = async(limit: number, offset: number): Promise<Partial<Place>[] & {id: string, address_id: number, label: string}[]> => {
    return await (await query(`SELECT id, "address_id", (SELECT "label" FROM ${schema}.${TABLES.ADDRESS} WHERE address."id" = "address_id") as label 
    FROM ${schema}.${TABLES.PLACE} ORDER BY place."updated_at" LIMIT $1 OFFSET $2;`, [limit, offset])).rows;
}

export const get_place_count = async(): Promise<number> => {
    const res = await (await query(`SELECT COUNT(id) FROM ${schema}.${TABLES.PLACE}`, []));

    if(res && res.rowCount > 0) {
        return res.rows[0].count || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}

export const upsert_place = async(place: Partial<Place>) => {
    place.updated_at = new Date();
    const q = create_upsert_query(place, TABLES.PLACE, ["id"]);

    return await (await query(`${q.query} RETURNING id`,q.values)).rows[0]?.id;
}