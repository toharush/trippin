import { GraphQLObjectType, GraphQLString } from 'graphql';
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
} from 'graphql/type';
import { schema, TABLES } from '../../../../../utils';

const Category = new GraphQLObjectType({
    name: 'category',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        is_primary: { type: GraphQLBoolean },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.CATEGORY}`,
            uniqueKey: 'id',
        },
    },
});

export default Category;

export const CategoryInput = new GraphQLInputObjectType({
    name: 'inputCategory',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        is_primary: { type: GraphQLBoolean },
    }),
});
