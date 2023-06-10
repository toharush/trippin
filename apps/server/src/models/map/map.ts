import { GraphQLInputObjectType } from 'graphql';
import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql/type';

const Map = new GraphQLInputObjectType({
    name: 'map',
    fields: () => ({
        key: { type: GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLNonNull(GraphQLInt) },
    }),
});

export default Map;
