import { Activity, ITripActivity } from '../../../client/src/interfaces';

export const filterCoveredActivities = (
    activities: Activity[],
    coveredActivities: (Activity | ITripActivity)[]
): Activity[] => {
    let uniqueActivities: Activity[] = [];

    activities.forEach(currentActivity => {
        let flag = false;

        coveredActivities.forEach(coveredActivity => {
            if (
                currentActivity.title ===
                (coveredActivity as ITripActivity).activity.title
            ) {
                flag = true;
            }
        });

        if (!flag) {
            uniqueActivities.push(currentActivity);
        }
    });

    return uniqueActivities;
};
