import * as dotenv from 'dotenv';
import postgraphile from 'postgraphile';
import express from 'express';

dotenv.config();

const PORT = process.env.APP_PORT || 8080;
const app = express();

if (process.env.NODE_ENV?.includes('development')) {
    console.log('Running on development mode');
}

if (process.env.NODE_ENV?.includes('debug')) {
    console.log('Running on debug mode');
    app.use(
        postgraphile(process.env.DATABASE_URL, process.env.DATABASE_SCHEMA, {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
        })
    );
}

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
