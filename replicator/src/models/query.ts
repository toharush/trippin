import client from "../utils/database/client";
import { schema } from "../utils/database/config";
import logger from "../utils/logger/logger";

export const query = async(query: string, values: any[]) => {
    try {
        logger.debug(`${query} ${values}`)
        return await (await client.query(query, values));
    } catch (err) {
        logger.error(`${err} ${query} ${values}`)
        return {
            rows: [],
            rowCount: 0
        }
    }
}

export interface queryObj {
    query: string;
    values: any[];
}

export const create_update_query = (inputObj: any, table: string | undefined, filter: string[] = []): queryObj => {
   return {
        query: `UPDATE ${table ? `${schema}.${table}` : ''} SET ${Object.keys(inputObj).filter(key => !filter.includes(key)).map((key: string, index: number) => `${key}=$${index + 1} `)}`,
        values:  Object.values(inputObj)
    };
}

export const create_insert_query = (inputObj: any, table: string, filter: string[] = []): queryObj => {
    return {
        query: `INSERT INTO ${schema}.${table}(${Object.keys(inputObj).filter(key => !filter.includes(key)).map((key: string) => `${key}`)}) VALUES (${Object.keys(inputObj).filter(key => !filter.includes(key)).map((key: string, index: number) => `$${index + 1}`)})`,
        values:  Object.values(inputObj)
    };
}

export const create_upsert_query = (inputObj: any, table: string, key: string[], filter: string[] = []):queryObj => {
    const insert_q = create_insert_query(inputObj, table, filter);
    const update_q = create_update_query(inputObj, undefined, filter);

    return {
        query: `${insert_q.query} ON CONFLICT(${key.map(key => `${key}`)}) DO ${update_q.query}`,
        values: insert_q.values
    }
}