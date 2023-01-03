import { Position } from "../interface/position";
import { QueryResult } from "../utils/database/client";
import { schema, TABLES } from "../utils/database/config";
import { create_upsert_query, query } from "./query";

export const upsert_position = async(pos: Partial<Position>): Promise<number>  => {
    const q = create_upsert_query(pos, TABLES.POSITION, ["id"]);
    return await (await query(`${q.query} RETURNING id`, q.values)).rows[0]?.id;
}

export const get_position_id = async(pos: Partial<Position>): Promise<number> => {
    const res = await (await query(`SELECT id FROM ${schema}.${TABLES.POSITION} WHERE lat=$1 AND lng=$2`, [pos.lat, pos.lng]));

    if(res && res.rowCount > 0) {
        return res.rows[0]?.id || QueryResult.FIELD_NOT_FOUND;
    }
    return QueryResult.COLUMN_NOT_FOUND;
}