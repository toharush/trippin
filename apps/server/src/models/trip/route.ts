import { GraphQLObjectType } from "graphql";
import { GraphQLFloat, GraphQLInt, GraphQLList } from "graphql/type";
import { schema, TABLES } from "../../../../../utils";
import DailyRouteActivity from "./routeActivity";

const DailyRoute = new GraphQLObjectType({
  name: "daily_route",
  fields: () => ({
    id: { type: GraphQLInt },
    trip_id: { type: GraphQLInt },
    date: { type: GraphQLFloat },
    index: { type: GraphQLInt },
    activities: {
      type: GraphQLList(DailyRouteActivity),
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "daily_route_id",
            parentKey: "id",
          },
        },
      },
    },
  }),
  extensions: {
    joinMonster: {
      sqlTable: `${schema}.${TABLES.DAILY_ROUTE}`,
      uniqueKey: "id",
    },
  },
});
export default DailyRoute;
