import { GraphQLInputObjectType } from 'graphql';
import { GraphQLFloat, GraphQLNonNull } from 'graphql/type';

const Icoordinate = new GraphQLInputObjectType({
    name: 'coordinate',
    fields: () => ({
        lat: { type: GraphQLNonNull(GraphQLFloat) },
        lng: { type: GraphQLNonNull(GraphQLFloat) },
    }),
});

export default Icoordinate;
