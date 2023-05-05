import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import Place from '../models/place/place';
import * as joinMonster from 'join-monster';
import { Client } from 'pg';

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
                    where: (placeTable, args, context) =>
                        `${placeTable}.id = ${args.id}`,
                },
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, (sql: any) => {
                    return client.query(sql);
                });
            },
        },
        placeByTitle: {
            type: Place,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
            },
            extensions: {
                joinMonster: {
                    where: (placeTable, args, context) =>
                        `${placeTable}.title = ${args.title}`,
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
