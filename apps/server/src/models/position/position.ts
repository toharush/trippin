import { GraphQLObjectType, GraphQLFloat } from 'graphql';

const position = new GraphQLObjectType({
    name: 'position',
    fields: () => ({
        id: { type: GraphQLFloat },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
    }),
    extensions: {
        joinMonster: {
            sqlTable: 'position',
            uniqueKey: 'id',
        },
    },
});

export default position;
