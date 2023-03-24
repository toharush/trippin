import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import mainRouter from './routes/main';
import Place from './models/place/place';
import * as joinMonster from 'join-monster';
import cors from 'cors';
import { Client } from 'pg';

const client = new Client({
    host: '192.168.31.45',
    port: 8888,
    user: 'trippin',
    password: 'Aa123456',
    database: 'trippin',
});
client.connect();

dotenv.config();

const PORT = process.env.APP_PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
const QueryRoot = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        places: {
            type: GraphQLList(Place),
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeById: {
            type: Place,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args, context) => {
                        return `${placeTable}.id = ${args.id}`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
    }),
});
const schema = new GraphQLSchema({ query: QueryRoot });

app.use(
    '/api/v1',
    graphqlHTTP({
        schema: schema,
        graphiql: false,
    })
);
app.use('/api/v1', mainRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
