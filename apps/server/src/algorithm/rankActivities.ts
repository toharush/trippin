import { Activity } from "../../../client/src/interfaces";
import { convertDBCategoryToClientCategory } from "../controllers/mapCategory";
import IClientCategory from "../../../client/src/interfaces/activity/clientCategory";
import { ACTIVITY_DEFAULT_RATING } from "../constants/algorithm";

export const getRankedActivities = (
  categoryPriorities: IClientCategory[],
  potentialActivities: Activity[]
): Activity[] =>
  potentialActivities.map((currentActivity) => {
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
  const clientCategory = convertDBCategoryToClientCategory(
    activity.category.name
  );

  const categoryPreference = getValueByKey(categoryPriorities, clientCategory);

  if (!activity.google?.rate) {
    return ACTIVITY_DEFAULT_RATING;
  } else {
    if (activity.google?.rate !== 0) {
      return categoryPreference * activity.google.rate!;
    } else {
      return categoryPreference * ACTIVITY_DEFAULT_RATING;
    }
  }
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
