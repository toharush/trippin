import client from "./sql_client"

export const query = async (query: string, values: any[]) => {
  try {
    return await await client.query(query, values);
  } catch (err) {
    console.error(err);
    return {
      rows: [],
      rowCount: 0,
    };
  }
};