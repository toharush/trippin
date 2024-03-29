import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
export const enum QueryResult {
  FIELD_NOT_FOUND = -2,
  COLUMN_NOT_FOUND = -1,
}

const client = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  port: Number(process.env.DB_PORT) || 5324,
  max: 1,
});

export default client;
