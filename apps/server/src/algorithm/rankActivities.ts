import { Activity } from '../../../client/src/interfaces';
import { dbCategoryToClientCategoryMapping } from '../controllers/mapCategory';
import IClientCategory from '../../../client/src/interfaces/activity/clientCategory';

const ACTIVITY_DEFAULT_RATING = 3;

export const getRankedActivities = (
    categoryPriorities: IClientCategory[],
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
    categoryPriorities: IClientCategory[]
): number => {
    let clientCategory = dbCategoryToClientCategoryMapping(activity.category);
    const categoryPreference: number | undefined = getValueByKey(
        categoryPriorities,
        clientCategory
    );

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

const getValueByKey = (
    categoryPriorities: IClientCategory[],
    clientCategory: string
): number | undefined => {
    for (const currentClientPriority of categoryPriorities) {
        if (currentClientPriority.categoryName === clientCategory) {
            return currentClientPriority.categoryPreference;
        }
    }
    return undefined;
};
