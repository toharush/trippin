import { Activity } from "../../../client/src/interfaces";
import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import IDailyRoute from "../../../client/src/interfaces/activity/dailyRoute";
import { getActivitiesInRadius } from "../controllers/activity";
import { uniqBy } from "lodash";

export const getAllPotentialActivites = async (
  startPoint: ICoordinate,
  radius: number
): Promise<Activity[]> =>
  uniqBy(await getActivitiesInRadius(radius, startPoint), "title");

export const calculateAllTripActivities = (dailyRoutes: IDailyRoute[]) => {
  let totalActivities: Activity[] = [];

  dailyRoutes.map((currentDailyRoute) => {
    currentDailyRoute.activities.map((currentActivity) => {
      totalActivities.push(currentActivity as Activity);
    });
  });

  return totalActivities;
};
