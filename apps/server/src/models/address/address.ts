import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLInt } from 'graphql/type';
import Presets, { presets } from './presets';

const address = new GraphQLObjectType({
    name: 'address',
    fields: () => ({
        id: { type: GraphQLInt },
        label: { type: GraphQLString },
        country_code: { type: GraphQLString },
        country_name: { type: GraphQLString },
        state: { type: GraphQLString },
        city: { type: GraphQLString },
        district: { type: GraphQLString },
        street: { type: GraphQLString },
        postal_code: { type: GraphQLString },
        presets: {
            type: Presets,
            resolve: presets,
            extensions: {
                joinMonster: {
                    ignoreTable: true,
                    ignoreAll: true
                },
            },
        },
    }),
    extensions: {
        joinMonster: {
            sqlTable: 'address',
            uniqueKey: 'id',
        },
    },
});

export default address;
