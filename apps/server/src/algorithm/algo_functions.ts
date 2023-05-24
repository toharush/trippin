import {Activity} from "../../../client/src/interfaces";

export const filterCoveredActivities = (allActivities: Activity[], coveredActivities: Activity[]) => {
    let potentialActivities = allActivities.slice();

    for (let index = 0; index < potentialActivities.length; index++) {
        if (potentialActivities[index] == coveredActivities[index]) {
            potentialActivities = potentialActivities.slice(index, index);
        }
    }

    return potentialActivities;
}

const gradeActivities = (categoryPriorities: Map<number, number>, activitiesInRadius: Activity[]) => {
    let rankedActivities = Map<Activity, number>;


}
