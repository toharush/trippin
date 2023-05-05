import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLFloat } from 'graphql/type';
import { schema, TABLES } from '../../../../../utils';

const Google = new GraphQLObjectType({
    name: 'google',
    fields: () => ({
        spend: { type: GraphQLString },
        rate: { type: GraphQLFloat },
        image_url: { type: GraphQLString },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.GOOGLE}`,
            uniqueKey: 'place_id',
        },
    },
});

export default Google;
