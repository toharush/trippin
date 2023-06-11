import { GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLFloat, GraphQLInt, GraphQLList } from "graphql/type";
import { schema, TABLES } from "../../../../../utils";
import DailyRouteDb, { DailyRoute } from "./route";

export const Trip = new GraphQLObjectType({
  name: "trip",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    routes: { type: GraphQLList(DailyRoute) },
    creationDate: { type: GraphQLFloat },
    startDate: { type: GraphQLFloat },
    endDate: { type: GraphQLFloat },
  }),
});

const TripDb = new GraphQLObjectType({
  name: "trip_db",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    routes: {
      type: GraphQLList(DailyRouteDb),
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
export default TripDb;
