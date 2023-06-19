import { Activity } from '../../../client/src/interfaces';
import { convertDBCategoryToClientCategory } from '../controllers/mapCategory';
import IClientCategory from '../../../client/src/interfaces/activity/clientCategory';
import { ACTIVITY_DEFAULT_RATING, MAX_RATE } from '../constants/algorithm';

export const getRankedActivities = (
    categoryPriorities: IClientCategory[],
    potentialActivities: Activity[],
    selectedActivities: Activity[]
): Activity[] =>
    potentialActivities.map(currentActivity => {
        currentActivity.rate = calculateActivityGrade(
            currentActivity,
            categoryPriorities,
            selectedActivities
        );
        return currentActivity;
    });

const calculateActivityGrade = (
    activity: Activity,
    categoryPriorities: IClientCategory[],
    selectedActivities: Activity[]
): number => {
    const clientCategory = convertDBCategoryToClientCategory(
        activity.category.name
    );

    const categoryPreference = getValueByKey(
        categoryPriorities,
        clientCategory
    );

    let grade = 0;

    if (!activity.google?.rate) {
        grade = ACTIVITY_DEFAULT_RATING;
    } else {
        if (activity.google?.rate !== 0) {
            grade = categoryPreference * activity.google.rate!;
        } else {
            grade = categoryPreference * ACTIVITY_DEFAULT_RATING;
        }
    }

    if (isActivitySelected(activity, selectedActivities)) {
        grade = MAX_RATE;
    }

    return grade;
};

const getValueByKey = (
    categoryPriorities: IClientCategory[],
    clientCategory: string
): number => {
    let clientPriority = 0;

    for (const currentClientPriority of categoryPriorities) {
        if (currentClientPriority.key === clientCategory) {
            clientPriority = currentClientPriority.value;
        }
    }

    return clientPriority;
};

const isActivitySelected = (
    activity: Activity,
    selectedActivities: Activity[]
): Boolean => {
    let flag = false;

    selectedActivities.forEach(currentActivity => {
        if (currentActivity.title === activity.title) {
            flag = true;
        }
    });

    return flag;
};
