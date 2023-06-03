import { Activity } from "../../../client/src/interfaces";
import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import IDailyRoute from "../../../client/src/interfaces/activity/dailyRoute";
import { getActivitiesInRadius } from "../controllers/activity";

export const getAllPotentialActivites = async (
    startPoint: ICoordinate,
    radius: number
): Promise<Activity[]> => await getActivitiesInRadius(radius, startPoint);

export const calculateAllTripActivities = (dailyRoutes: IDailyRoute[]) => {
    let totalActivities: Activity[] = [];

    dailyRoutes.map(currentDailyRoute => {
        currentDailyRoute.activities.map(currentActivity => {
            totalActivities.push(currentActivity);
        });
    });

    return totalActivities;
};