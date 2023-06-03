import { Activity } from "../../../client/src/interfaces";
import { dbCategoryToClientCategoryMapping } from "../controllers/mapCategory";

const ACTIVITY_DEFAULT_RATING = 3;

export const getRankedActivities = (
    categoryPriorities: Map<string, number>,
    potentialActivities: Activity[]
): Activity[] =>
    potentialActivities.map(currentActivity => {
        currentActivity.rate = calculateActivityGrade(
            currentActivity,
            categoryPriorities
        );
        return currentActivity;
    });

const calculateActivityGrade = (
    activity: Activity,
    categoryPriorities: Map<string, number>
): number => {
    let clientCategory = dbCategoryToClientCategoryMapping(activity.category);
    const categoryPreference: number | undefined = categoryPriorities.get(clientCategory);

    if (!categoryPreference) {
        return 0;
    } else {
        if (activity.google?.rate) {
            return categoryPreference * activity.google.rate;
        } else {
            return categoryPreference * ACTIVITY_DEFAULT_RATING;
        }
    }
};