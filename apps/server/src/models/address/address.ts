import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLInt } from 'graphql/type';
import { schema, TABLES } from '../../../../../utils';
import Presets, { presets } from './presets';

const Address = new GraphQLObjectType({
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
                    ignoreAll: true,
                },
            },
        },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.ADDRESS}`,
            uniqueKey: 'id',
        },
    },
});

export default Address;
