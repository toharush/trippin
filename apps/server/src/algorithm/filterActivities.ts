import { Activity } from "../../../client/src/interfaces";

export const filterCoveredActivities = (
    activities: Activity[],
    coveredActivities: Activity[]
): Activity[] =>
    activities.filter(
        currentActivity =>
            !isActivityCovered(currentActivity, coveredActivities)
    );

const isActivityCovered = (
    activity: Activity,
    activities: Activity[]
): boolean => Boolean(activities.length > 0 && activities.filter(currentActivity => currentActivity.id === activity.id));
