import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});
client.connect();

export default client;