import { GraphQLObjectType, GraphQLFloat } from 'graphql';

const Position = new GraphQLObjectType({
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

export default Position;
