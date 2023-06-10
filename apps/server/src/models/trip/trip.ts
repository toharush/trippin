import { GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLFloat, GraphQLInt, GraphQLList } from "graphql/type";
import Place from "../place/place";

const Route = new GraphQLObjectType({
  name: "route",
  fields: () => ({
    date: { type: GraphQLFloat },
    index: { type: GraphQLInt },
    activities: { type: GraphQLList(Place) },
  }),
});

const Trip = new GraphQLObjectType({
  name: "trip",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    routes: { type: GraphQLList(Route) },
    creationDate: { type: GraphQLFloat },
    startDate: { type: GraphQLFloat },
    endDate: { type: GraphQLFloat },
  }),
});

export default Trip;
