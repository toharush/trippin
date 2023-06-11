import { ITripActivity } from "../../../client/src/interfaces";
import IDailyRoute from "../../../client/src/interfaces/activity/dailyRoute";
import { createNewDailyRouteInDb } from "../models/native/dailyRoute";
import { createNewDailyRouteActivity } from "./dailyRouteActivity";

export const createNewDailyRoute = async (
  tripId: number,
  route: IDailyRoute
) => {
  const routeId = await createNewDailyRouteInDb(tripId, route);

  route.activities.map(
    async (currentActivity) =>
      await createNewDailyRouteActivity(
        routeId,
        (currentActivity as ITripActivity).activity.id,
        (currentActivity as ITripActivity).start_time!,
        (currentActivity as ITripActivity).end_time!
      )
  );

  return routeId;
};
