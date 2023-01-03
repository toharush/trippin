import { Address } from "../interface/address";
import { TABLES } from '../utils/database/config';
import { query, create_upsert_query } from "./query";


export const upsert_address = async(address: Partial<Address>): Promise<number>  => {
    const q = create_upsert_query(address, TABLES.ADDRESS, ["id"]);
    return await (await query(`${q.query} RETURNING id`,q.values)).rows[0]?.id;
}
