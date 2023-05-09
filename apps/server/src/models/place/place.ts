import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLList } from 'graphql/type';
import { schema, TABLES } from '../../../../../utils';
import address from '../address/address';
import category from '../category/category';
import extraCategories from '../category/extraCategories';
import google from '../google/google';
import OpenHours from '../openHours/openHours';
import position from '../position/position';

const Place = new GraphQLObjectType({
    name: 'place',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        type: { type: GraphQLString },
        open_hours: { type: GraphQLList(OpenHours) },
        extra: {
            type: extraCategories,
            extensions: {
                joinMonster: {
                    ignoreAll: true,
                    sqlBatch: {
                        thisKey: 'place_id',
                        parentKey: 'id',
                    },
                },
            },
        },
        category: {
            type: category,
            extensions: {
                joinMonster: {
                    ignoreAll: true,
                    sqlBatch: {
                        thisKey: 'id',
                        parentKey: 'category_id',
                    },
                },
            },
        },
        google: {
            type: google,
            extensions: {
                joinMonster: {
                    ignoreAll: true,
                    sqlBatch: {
                        thisKey: 'place_id',
                        parentKey: 'id',
                    },
                },
            },
        },
        address: {
            type: address,
            extensions: {
                joinMonster: {
                    ignoreAll: true,
                    sqlBatch: {
                        thisKey: 'id',
                        parentKey: 'address_id',
                    },
                },
            },
        },
        position: {
            type: position,
            extensions: {
                joinMonster: {
                    ignoreAll: false,
                    sqlBatch: {
                        thisKey: 'id',
                        parentKey: 'position_id',
                    },
                },
            },
        },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.PLACE}`,
            uniqueKey: 'id',
        },
    },
});

export default Place;
