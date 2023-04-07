import client from "../utils/database/client";
import logger from "../utils/logger/logger";

export const query = async(query: string, values: any[]) => {
    try {
        console.log(query, values)
        return await (await client.query(query, values));
    } catch (err) {
        logger.error(err)
        return {
            rows: [],
            rowCount: 0
        }
    }
}
