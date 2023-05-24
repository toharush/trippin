import {Activity} from "../../../client/src/interfaces";

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
        let grade = getActivityGrade(currentActivity, categoryPriorities);
        rankedActivities.set(currentActivity, grade);
    })

    return rankedActivities;
}

const getActivityGrade = (activity: Activity, categoryPriorities: Map<String, number>) => {
    // Change 5 to activity.rating after inserting rating for every activity in the DB
    let activityRating: number = 5;
    let categoryPreference: number | undefined = categoryPriorities.get(activity.category);
    
    if (categoryPreference !== undefined) {
        return activityRating * categoryPreference;
    }
    return 0;    
}