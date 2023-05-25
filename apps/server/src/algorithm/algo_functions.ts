import { Activity } from "../../../client/src/interfaces";
import { calculateDistance } from "../controllers/MapCalculation";
import ICoordinate from "../../../client/src/interfaces/activity/coordinate";

export const filterCoveredActivities = (allActivities: Activity[], coveredActivities: Activity[]) => {
    let potentialActivities: Activity[] = [];
    
    allActivities.forEach(currentActivity => {
        if (!isActivityCovered(currentActivity, coveredActivities)) {
            potentialActivities.push(currentActivity);
        } 
    });

    return potentialActivities;
}

const isActivityCovered = (activity: Activity, activities: Activity[]) => {
    if (activities.includes(activity)) {
        return true;
    }
    return false;
}


export const getRankedActivities = (categoryPriorities: Map<String, number>, potentialActivities: Activity[]) => {
    let rankedActivities: Map<Activity, number> = new Map();

    potentialActivities.forEach(currentActivity => {
        let grade = calculateActivityGrade(currentActivity, categoryPriorities);
        rankedActivities.set(currentActivity, grade);
    })

    return rankedActivities;
}

const calculateActivityGrade = (activity: Activity, categoryPriorities: Map<String, number>) => {
    // Change 5 to activity.rating after inserting rating for every activity in the DB
    let activityRating: number = 5;
    let categoryPreference: number | undefined = categoryPriorities.get(activity.category);
    
    if (categoryPreference !== undefined) {
        return activityRating * categoryPreference;
    }
    return 0;    
}


export const getAllPotentialActivites = (startPoint: ICoordinate, radius: number, categoryPriorities: Map<String, number>) => {
    let potentialActivities: Activity[] = [];

    Object.keys(categoryPriorities).forEach(key => {
        if (categoryPriorities.get(key) != 0) {
            // Call the sql query
            let activities: Activity[] = [];

            let activitiesInCircle: Activity[] = getActivitiesInCircle(activities, startPoint, radius);
            potentialActivities = potentialActivities.concat(activitiesInCircle);
        }
    })

    return potentialActivities;
}

const getActivitiesInCircle = (activities: Activity[], startPoint: ICoordinate, radius: number) => {
    let activitiesInCircle: Activity[] = [];

    activities.forEach(currentActivity => {
        let coordinate: ICoordinate = {lat: currentActivity.position.lat, lng: currentActivity.position.lng};
        if (calculateDistance(coordinate, startPoint) <= radius) {
            activitiesInCircle.push(currentActivity);
        }
    });

    return activitiesInCircle;
}