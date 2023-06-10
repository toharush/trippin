import client from "../utils/database/client";
import logger from "../utils/logger/logger";

export const query = async (query: string, values: any[]) => {
  try {
    return await await client.query(query, values);
  } catch (err) {
    logger.error(`${err} ON QUERY ${query}`);
    return {
      rows: [],
      rowCount: 0,
    };
  }
};
