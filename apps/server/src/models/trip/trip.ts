import { GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLFloat, GraphQLInt, GraphQLList } from "graphql/type";
import { schema, TABLES } from "../../../../../utils";
import DailyRoute, { Route } from "./route";

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

export const tripDb = new GraphQLObjectType({
  name: "trip_db",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    routes: {
      type: GraphQLList(DailyRoute),
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "trip_id",
            parentKey: "id",
          },
        },
      },
    },
    creation_date: { type: GraphQLFloat },
    start_date: { type: GraphQLFloat },
    end_date: { type: GraphQLFloat },
    user_id: { type: GraphQLString },
  }),
  extensions: {
    joinMonster: {
      sqlTable: `${schema}.${TABLES.TRIP}`,
      uniqueKey: "id",
    },
  },
});
export default Trip;
