import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLList, GraphQLInt } from 'graphql/type';
import { schema, TABLES } from '../../../../../utils';
import category from './category';

const extraCategories = new GraphQLObjectType({
    name: 'extra_categories',
    fields: () => ({
        place_id: { type: GraphQLString },
        category_id: { type: GraphQLInt },
        categories: {
            type: GraphQLList(category),
            extensions: {
                joinMonster: {
                    sqlBatch: {
                        thisKey: 'id',
                        parentKey: 'category_id',
                    },
                },
            },
        },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.EXTRA_CATEGORIES}`,
            uniqueKey: ['place_id', 'category_id'],
        },
    },
});

export default extraCategories;
