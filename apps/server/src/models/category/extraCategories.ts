import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLList, GraphQLInt } from 'graphql/type';
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
            sqlTable: 'extra_categories',
            uniqueKey: ['place_id', 'category_id'],
        },
    },
});

export default extraCategories;
