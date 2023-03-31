import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLBoolean, GraphQLList } from 'graphql/type';
import Structured from '../structured/structured';

const OpenHours = new GraphQLObjectType({
    name: 'open_hours',
    fields: () => ({
        text: { type: GraphQLList(GraphQLString) },
        isOpen: { type: GraphQLBoolean },
        structured: { type: GraphQLList(Structured) },
    }),
});

export default OpenHours;
