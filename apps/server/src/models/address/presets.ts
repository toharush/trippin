import { GraphQLObjectType } from 'graphql';
import { GraphQLInt } from 'graphql/type';

const Presets = new GraphQLObjectType({
    name: 'presets',
    fields: () => ({
        museums: { type: GraphQLInt },
        resturants: { type: GraphQLInt },
        sport: { type: GraphQLInt },
        shopping: { type: GraphQLInt },
        nature: { type: GraphQLInt },
        atractions: { type: GraphQLInt },
        night_life: { type: GraphQLInt },
        shows_Concerts: { type: GraphQLInt },
    }),
});

export default Presets;

export const presets = (address: any) => ({
    museums: address.id,
    resturants: address.id,
    sport: address.id,
    shopping: address.id,
    nature: address.id,
    atractions: address.id,
    night_life: address.id,
    shows_Concerts: address.id,
});
