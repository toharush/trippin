import dotenv from 'dotenv';
import postgraphile from 'postgraphile';

dotenv.config();

export default postgraphile(
    process.env.DATABASE_URL,
    process.env.DATABASE_SCHEMA,
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
);
