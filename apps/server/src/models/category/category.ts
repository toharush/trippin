import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLBoolean, GraphQLInt } from 'graphql/type';

const category = new GraphQLObjectType({
    name: 'category',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        is_primary: { type: GraphQLBoolean },
    }),
    extensions: {
        joinMonster: {
            sqlTable: 'category',
            uniqueKey: 'id',
        },
    },
});

export default category;