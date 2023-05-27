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
import * as joinMonster from 'join-monster';
import Place from './models/place/place';
import getPlaceSQLQuery from './mapping/placeByAddressMapping';
import { schema as DBSchema, TABLES } from '../../../utils';
import mainRouter from './routes/main';
import cors from 'cors';
import client from './utils/sql_client';
import { calculateTrip } from './algorithm/algoFunctions';

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
                    console.log(sql);
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
                    where: (placeTable, args) => {
                        return `${placeTable}.id = '${args.id}'`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeByTitle: {
            type: GraphQLList(Place),
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args) => {
                        return `${placeTable}.title = '${args.title}'`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeByCategoryName: {
            type: GraphQLList(Place),
            args: {
                categoryName: { type: new GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args) => {
                        const categoryIdQuery = `(SELECT id FROM ${DBSchema}.${TABLES.CATEGORY} WHERE name='${args.categoryName}')`;
                        return `${placeTable}.category_id IN ${categoryIdQuery}`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeByCity: {
            type: GraphQLList(Place),
            args: {
                cityName: { type: new GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args) => {
                        const addressIdQuery = `(SELECT id FROM ${DBSchema}.${TABLES.ADDRESS} WHERE city='${args.cityName}')`;
                        return `${placeTable}.address_id IN ${addressIdQuery}`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeByState: {
            type: GraphQLList(Place),
            args: {
                stateName: { type: new GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args) => {
                        const addressIdQuery = `(SELECT id FROM ${DBSchema}.${TABLES.ADDRESS} WHERE state='${args.stateName}')`;
                        return `${placeTable}.address_id IN ${addressIdQuery}`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeByCountry: {
            type: GraphQLList(Place),
            args: {
                countryCode: { type: new GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args) => {
                        const addressIdQuery = `(SELECT id FROM ${DBSchema}.${TABLES.ADDRESS} WHERE country_code='${args.countryCode}')`;
                        return `${placeTable}.address_id IN ${addressIdQuery}`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeByAddress: {
            type: GraphQLList(Place),
            args: {
                countryCode: { type: new GraphQLNonNull(GraphQLString) },
                stateName: { type: GraphQLString },
                cityName: { type: GraphQLString },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args) => {
                        const sqlQuery = getPlaceSQLQuery(
                            args.countryCode,
                            args.stateName,
                            args.cityName
                        );
                        return `${placeTable}.address_id IN ${sqlQuery}`;
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

let date = new Date();
date.setDate(date.getDate() + 3);

(async () =>
    console.log(
        await calculateTrip(
            'a',
            { lat: 36.13506, lng: -95.97135 },
            50,
            new Map([['Atractions', 8]]),
            [
                {
                    id: '25499431:place',
                    title: 'Central Place, Tulsa, OK, United States',
                    type: 'locality',
                    open_hours: [],
                    position: {
                        lat: 36.1501,
                        lng: -95.9647,
                    },
                    address: {},
                    category: {},
                    extra: {},
                    google: {},
                    rate: 0,
                },
            ],
            new Date(),
            date
        )
    ))();

app.use(
    '/api/v1',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

app.use('/api/v1', mainRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
