import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLBoolean, GraphQLInt } from 'graphql/type';
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
