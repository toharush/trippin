import { GraphQLObjectType, GraphQLFloat } from 'graphql';
import { schema, TABLES } from '../../../../../utils';

const Position = new GraphQLObjectType({
    name: 'position',
    fields: () => ({
        id: { type: GraphQLFloat },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
    }),
    extensions: {
        joinMonster: {
            sqlTable: `${schema}.${TABLES.POSITION}`,
            uniqueKey: 'id',
        },
    },
});

export default Position;
