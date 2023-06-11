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
        currentActivity.id,
        currentActivity.startTime!,
        currentActivity.endTime!
      )
  );

  return routeId;
};
