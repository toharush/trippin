import { GraphQLObjectType } from "graphql";
import { GraphQLFloat, GraphQLInt, GraphQLList } from "graphql/type";
import { schema, TABLES } from "../../../../../utils";
import Place from "../place/place";

const DailyRouteActivity = new GraphQLObjectType({
  name: "daily_route_activity",
  fields: () => ({
    daily_route_id: { type: GraphQLInt },
    start_time: { type: GraphQLFloat },
    end_time: { type: GraphQLFloat },
    activity: {
      type: Place,
      extensions: {
        joinMonster: {
          ignoreAll: false,
          sqlBatch: {
            thisKey: "id",
            parentKey: "place_id",
          },
        },
      },
    },
  }),
  extensions: {
    joinMonster: {
      sqlTable: `${schema}.${TABLES.DAILY_ROUTE_ACTIVITY}`,
      uniqueKey: ["daily_route_id", "place_id"],
    },
  },
});
export default DailyRouteActivity;
