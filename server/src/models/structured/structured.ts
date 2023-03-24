import { GraphQLObjectType, GraphQLString } from 'graphql';

const Structured = new GraphQLObjectType({
    name: 'structured',
    fields: () => ({
        start: { type: GraphQLString },
        duration: { type: GraphQLString },
        recurrence: { type: GraphQLString },
    }),
});

export default Structured;