import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
} from 'graphql';
import * as joinMonster from 'join-monster';
import Place, { InputPlace } from './models/place/place';
import getPlaceSQLQuery from './controllers/mapPlace';
import { schema as DBSchema, TABLES } from '../../../utils';
import mainRouter from './routes/main';
import cors from 'cors';
import Comment from './models/comment/comment';
import { registerNewComment } from './controllers/comment';
import { calculateTrip } from './algorithm/calculateTrip';
import client from './utils/dbClient';
import Icoordinate from './models/Icoordinate/icoordinate';
import Map from './models/map/map';

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
        commentsByPlaceId: {
            type: GraphQLList(Comment),
            args: {
                place_id: { type: GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (commentTable, args) => {
                        return `place_id = '${args.place_id}'`;
                    },
                },
            },
            resolve: (parent, args, context, resolveInfo) =>
                joinMonster.default(resolveInfo, {}, (sql: string) =>
                    client.query(sql)
                ),
        },
    }),
});
const MutationRoot = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addComment: {
            type: Comment,
            args: {
                place_id: { type: GraphQLNonNull(GraphQLString) },
                user_id: { type: GraphQLNonNull(GraphQLString) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args, context, resolveInfo) =>
                await registerNewComment(
                    args.user_id,
                    args.place_id,
                    args.text
                ),
        },
        createTrip: {
            type: GraphQLList(Place),
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                cityCenter: { type: GraphQLNonNull(Icoordinate) },
                radius: { type: GraphQLNonNull(GraphQLFloat) },
                categoryPriorities: { type: GraphQLNonNull(GraphQLList(Map)) },
                selectedActivities: {
                    type: GraphQLNonNull(GraphQLList(InputPlace)),
                },
                startDate: { type: GraphQLNonNull(GraphQLFloat) },
                endDate: { type: GraphQLNonNull(GraphQLFloat) },
                startHour: { type: GraphQLNonNull(GraphQLFloat) },
                endHour: { type: GraphQLNonNull(GraphQLFloat) },
            },
            resolve: async (
                _,
                {
                    name,
                    cityCenter,
                    categoryPriorities,
                    selectedActivities,
                    radius,
                    startDate,
                    endDate,
                    startHour,
                    endHour,
                }
            ) => {
                return (
                    await calculateTrip(
                        name,
                        cityCenter,
                        radius,
                        categoryPriorities,
                        selectedActivities,
                        new Date(startDate),
                        new Date(endDate),
                        new Date(startHour),
                        new Date(endHour)
                    )
                ).routes[0].activities;
            },
        },
    }),
});
const gqlSchema = new GraphQLSchema({
    query: QueryRoot,
    mutation: MutationRoot,
});

let date = new Date();
date.setDate(date.getDate() + 3);


app.use(
    '/api/v1',
    graphqlHTTP({
        schema: gqlSchema,
        graphiql: true,
    })
);

app.use('/api/v1', mainRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
