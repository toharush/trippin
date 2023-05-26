import { Activity } from "../../../client/src/interfaces";
import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import Place from "../interfaces/place";
import { getPlacesInRadius } from "../controllers/Place";

export const filterCoveredActivities = (
    activities: Activity[],
    coveredActivities: Activity[]
): Activity[] => {
    let potentialActivities: Activity[] = [];
    
    activities.forEach(currentActivity => {
        if (!isActivityCovered(currentActivity, coveredActivities)) {
            potentialActivities.push(currentActivity);
        } 
    });

    return potentialActivities;
}

const isActivityCovered = (
    activity: Activity,
    activities: Activity[]
): boolean => {
    if (activities.includes(activity)) {
        return true;
    }
    return false;
}


export const getRankedActivities = (
    categoryPriorities: Map<String, number>,
    potentialActivities: Activity[]
): Map<Activity, number> => {
    let rankedActivities: Map<Activity, number> = new Map();

    potentialActivities.forEach(currentActivity => {
        let grade = calculateActivityGrade(currentActivity, categoryPriorities);
        rankedActivities.set(currentActivity, grade);
    })

    return rankedActivities;
}

const calculateActivityGrade = (
    activity: Activity,
    categoryPriorities: Map<String, number>
): number => {
    const activityDefaultRating: number = 3;
    const categoryPreference: number | undefined = categoryPriorities.get(activity.category);
    
    if (categoryPreference === undefined) {
        return 0;    
    } else {
        if (activity.google.rate === undefined) {
            return categoryPreference * activityDefaultRating;
        } else {
            return categoryPreference * parseInt(activity.google.rate);
        }
    }
}


export const getAllPotentialActivites = (
    startPoint: ICoordinate,
    radius: number,
    categoryPriorities: Map<String, number>
): Place[] => {
    let potentialPlaces: Place[] = [];

    Object.keys(categoryPriorities).forEach(async (key) => {
        if (categoryPriorities.get(key) != 0) {
            let currentCategoryPlaces: Place[] = await getPlacesInRadius(radius, startPoint);
            potentialPlaces = potentialPlaces.concat(currentCategoryPlaces);
        }
    })

    return potentialPlaces;
}