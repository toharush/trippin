import { Activity } from '../../../client/src/interfaces';
import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import IDailyRoute from '../../../client/src/interfaces/activity/dailyRoute';
import { getActivitiesInRadius } from '../controllers/activity';

export const getAllPotentialActivites = async (
    startPoint: ICoordinate,
    radius: number
): Promise<Activity[]> => {
    let activities = await getActivitiesInRadius(radius, startPoint);
    let uniqueActivities: Activity[] = [];

    activities.forEach(currentActivity => {
        let flag = false;

        uniqueActivities.forEach(currentUniqueActivity => {
            if (currentActivity.title === currentUniqueActivity.title) {
                flag = true;
            }
        });

        if (!flag) {
            uniqueActivities.push(currentActivity);
        }
    });

    return uniqueActivities;
};

export const calculateAllTripActivities = (dailyRoutes: IDailyRoute[]) => {
    let totalActivities: Activity[] = [];

    dailyRoutes.map(currentDailyRoute => {
        currentDailyRoute.activities.map(currentActivity => {
            totalActivities.push(currentActivity as Activity);
        });
    });

    return totalActivities;
};
