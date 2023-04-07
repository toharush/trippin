import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLFloat } from 'graphql/type';

const google = new GraphQLObjectType({
    name: 'google',
    fields: () => ({
        spend: { type: GraphQLString },
        rate: { type: GraphQLFloat },
        image_url: { type: GraphQLString },
    }),
    extensions: {
        joinMonster: {
            sqlTable: 'google',
            uniqueKey: 'place_id',
        },
    },
});

export default google;
