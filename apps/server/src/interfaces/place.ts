import {
    GraphQLInterfaceType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
} from 'graphql';

export const PlaceType = new GraphQLInterfaceType({
    name: 'place',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        type: { type: GraphQLString },
        open_hours: {
            type: GraphQLList(
                new GraphQLInterfaceType({
                    name: 'open_hours',
                    fields: {
                        text: { type: GraphQLList(GraphQLString) },
                        isOpen: { type: GraphQLBoolean },
                        structured: {
                            type: GraphQLList(
                                new GraphQLInterfaceType({
                                    name: 'structured',
                                    fields: {
                                        start: { type: GraphQLString },
                                        duration: { type: GraphQLString },
                                        recurrence: { type: GraphQLString },
                                    },
                                })
                            ),
                        },
                    },
                })
            ),
        },
        position_id: { type: GraphQLString },
        category_id: { type: GraphQLInt },
        address_id: { type: GraphQLInt },
    },
});
