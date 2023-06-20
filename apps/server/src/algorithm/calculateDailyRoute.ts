import ICoordinate from '../../../client/src/interfaces/activity/coordinate';
import { Activity } from '../../../client/src/interfaces';
import { filter, map } from 'lodash';
import {
    AVERAGE_RATE,
    AVERAGE_SPEED,
    MINIMAL_TRAVEL_TIME_SLOT,
    SPLIT_TO_QUARTER,
} from '../constants/algorithm';
import { calculateDistance } from '../controllers/mapCalc';
import { clientCategories } from '../enums/clientCategory';

export function findBestActivities(
    activities: Activity[],
    startHour: number,
    endHour: number,
    startPosition: ICoordinate,
    date: Date
): Activity[] {
    const availableActivities = filterActivitiesOutOfUserTimeRange(
        activities,
        startHour,
        endHour
    );

    const combinationsValue = new Array(availableActivities.length).fill(0);
    const selectedActivitiesCombinations: (Activity | null)[][] = initSelectedActivities(
        availableActivities,
        startHour,
        endHour
    );
    for (
        let activitiesCombinationIndex = 0;
        activitiesCombinationIndex < availableActivities.length;
        activitiesCombinationIndex++
    ) {
        let reorderedActivities = reorderAvailableActivities(
            availableActivities,
            activitiesCombinationIndex
        );
        const currentCombinationValues: number[] = initCurrentCombinationValues(
            startHour,
            endHour
        );
        for (
            let currentHour = startHour;
            currentHour < calcActivityEndHour(startHour, endHour);
            currentHour++
        ) {
            let selectedActivity: Activity | null = null;
            let currentTimeSlot = currentHour - startHour;
            let maxValueOfTimeSlot = currentCombinationValues[currentTimeSlot];
            for (const activity of reorderedActivities) {
                activity.duration = getActivityDuration(activity);
                const lastSelectedActivity = getLastSelectedActivity(
                    selectedActivitiesCombinations[activitiesCombinationIndex]
                );
                let distance: number = 0;
                if (currentTimeSlot !== 0 && lastSelectedActivity !== null) {
                    distance = calculateDistance(
                        activity.position,
                        lastSelectedActivity.position
                    );
                } else if (
                    !compareLocations(startPosition, activity.position)
                ) {
                    distance = calculateDistance(
                        startPosition,
                        activity.position
                    );
                }
                activity.travelAndVisitTime =
                    distance !== 0
                        ? calcActivityTravelAndVisitTime(
                              activity.duration,
                              distance
                          )
                        : activity.duration * SPLIT_TO_QUARTER;
                const activityValue = activity.rate
                    ? activity.rate / (distance + 1)
                    : AVERAGE_RATE / (distance + 1);

                const categoryDiversityFactor = getCategoryDiversityFactor(
                    selectedActivitiesCombinations[activitiesCombinationIndex],
                    activity.category.name
                );
                const weightedActivityValue =
                    activityValue * categoryDiversityFactor;
                if (
                    isActivityOpenNow(
                        activity,
                        currentHour,
                        startHour,
                        endHour
                    ) &&
                    weightedActivityValue > maxValueOfTimeSlot
                ) {
                    maxValueOfTimeSlot = weightedActivityValue;
                    currentCombinationValues[
                        currentTimeSlot
                    ] = maxValueOfTimeSlot;
                    selectedActivity = activity;
                }
            }

            combinationsValue[activitiesCombinationIndex] += maxValueOfTimeSlot;
            if (
                selectedActivity !== null &&
                selectedActivity.travelAndVisitTime !== undefined
            ) {
                let activityStartTime =
                    (currentTimeSlot +
                        calcActivityTravelTime(
                            selectedActivity.travelAndVisitTime,
                            selectedActivity.duration!
                        )) /
                        SPLIT_TO_QUARTER +
                    startHour;
                selectedActivity = setActivityTimeRange(
                    selectedActivity,
                    activityStartTime,
                    date
                );
                for (let i = 0; i < selectedActivity.travelAndVisitTime!; i++) {
                    selectedActivitiesCombinations[activitiesCombinationIndex][
                        currentTimeSlot + i
                    ] = selectedActivity;
                }
                currentHour += selectedActivity.travelAndVisitTime! - 1;
                reorderedActivities = removeActivityById(
                    reorderedActivities,
                    selectedActivity.id
                );
            }
        }
    }

    return getBestDayRoute(combinationsValue, selectedActivitiesCombinations);
}

function convertHourToNumberFormat(hour: Date): number {
    const hourValue = hour.getHours();
    const minuteValue = hour.getMinutes();
    return hourValue + minuteValue / 60;
}

function filterActivitiesOutOfUserTimeRange(
    activities: Activity[],
    startHour: number,
    endHour: number
): Activity[] {
    return filter(
        activities,
        activity =>
            convertHourToNumberFormat(activity.open_hour) <= endHour &&
            convertHourToNumberFormat(activity.close_hour) >= startHour
    );
}

function initSelectedActivities(
    activities: Activity[],
    startHour: number,
    endHour: number
): (Activity | null)[][] {
    return new Array(activities.length)
        .fill(null)
        .map(() =>
            new Array(
                endHour * SPLIT_TO_QUARTER - startHour * SPLIT_TO_QUARTER
            ).fill(null)
        );
}

function reorderAvailableActivities(
    activities: Activity[],
    firstActivityIndex: number
): Activity[] {
    if (firstActivityIndex < activities.length) {
        return [
            activities[firstActivityIndex],
            ...activities.slice(0, firstActivityIndex),
            ...activities.slice(firstActivityIndex + 1),
        ];
    } else {
        return activities;
    }
}

function initCurrentCombinationValues(
    startHour: number,
    endHour: number
): number[] {
    return new Array(
        endHour * SPLIT_TO_QUARTER - startHour * SPLIT_TO_QUARTER
    ).fill(0);
}

function calcActivityEndHour(start: number, end: number): number {
    return (end - start) * SPLIT_TO_QUARTER + start;
}

function getLastSelectedActivity(
    activities: (Activity | null)[]
): Activity | null {
    for (let i = activities.length - 1; i >= 0; i--) {
        if (activities[i]) {
            return activities[i];
        }
    }
    return null;
}

function compareLocations(
    firstPosition: ICoordinate,
    secondPosition: ICoordinate
): boolean {
    return (
        firstPosition.lat === secondPosition.lat &&
        firstPosition.lng === secondPosition.lng
    );
}

function calcActivityTravelAndVisitTime(
    duration: number,
    distance: number
): number {
    return (
        roundTravelTime(duration * SPLIT_TO_QUARTER) +
        roundTravelTime((distance / AVERAGE_SPEED) * SPLIT_TO_QUARTER)
    );
}

function calcActivityTravelTime(
    travelAndVisitTime: number,
    duration: number
): number {
    return travelAndVisitTime - duration * SPLIT_TO_QUARTER;
}

function isActivityOpenNow(
    activity: Activity,
    currentHour: number,
    startHour: number,
    endHour: number
): boolean {
    const activityOpenHourInNumFormat = convertHourToNumberFormat(
        activity.open_hour
    );
    const activityCloseHourInNumFormat = convertHourToNumberFormat(
        activity.close_hour
    );
    return activity.travelAndVisitTime
        ? activityOpenHourInNumFormat <= currentHour &&
              currentHour + activity.travelAndVisitTime <=
                  calcActivityEndHour(
                      activityOpenHourInNumFormat,
                      activityCloseHourInNumFormat
                  ) &&
              currentHour + activity.travelAndVisitTime <=
                  calcActivityEndHour(startHour, endHour)
        : false;
}

function roundTravelTime(number: number): number {
    return number > MINIMAL_TRAVEL_TIME_SLOT
        ? Math.round(number)
        : MINIMAL_TRAVEL_TIME_SLOT;
}

const removeActivityById = (activities: Activity[], id: string): Activity[] => {
    return filter(activities, activity => activity.id !== id);
};

const getActivityDuration = (activity: Activity): number => {
    return activity?.google?.spend
        ? roundToQuarterHour(activity.google.spend)
        : 2;
};

function roundToQuarterHour(durationMs: number): number {
    const quarterMs = 15 * 60 * 1000; // 15 minutes in milliseconds

    const hours = Math.floor(durationMs / (60 * 60 * 1000));
    const remainingMs = durationMs % (60 * 60 * 1000);
    const quarters = Math.round(remainingMs / quarterMs);

    const roundedDuration = hours + quarters / 4;

    return roundedDuration;
}

function filterDuplicateActivities(
    selectedActivities: (Activity | null)[]
): Activity[] {
    const filteredActivities: Activity[] = [];
    const activitySet = new Set<String>();

    console.log('selectedActivities', selectedActivities);

    for (let i = 0; i < selectedActivities?.length; i++) {
        let currActivity = selectedActivities[i];
        if (currActivity !== null && !activitySet.has(currActivity!.id)) {
            filteredActivities.push(currActivity);
            activitySet.add(currActivity.id);
        }
    }
    return filteredActivities;
}

function getBestDayRoute(
    dp: number[],
    selectedActivities: (Activity | null)[][]
): Activity[] {
    const maxValue = Math.max(...dp);
    const maxIndex = dp.indexOf(maxValue);
    return filterDuplicateActivities(selectedActivities[maxIndex]);
}

function convertTimeSlotToDate(date: Date, time: number): Date {
    const hour = Math.floor(time);
    const minute = Math.round((time - hour) * 60);

    const convertedDate = new Date(date);
    convertedDate.setHours(hour);
    convertedDate.setMinutes(minute);
    convertedDate.setSeconds(0);

    return convertedDate;
}

function setActivityTimeRange(
    activity: Activity,
    startTime: number,
    date: Date
): Activity {
    activity.startTime = convertTimeSlotToDate(date, startTime);
    activity.endTime = convertTimeSlotToDate(
        date,
        startTime + activity.duration!
    );

    return activity;
}

function getCategoryDiversityFactor(
    selectedActivities: (Activity | null)[],
    category: string
): number {
    const categoryCounts = new Map<string, number>();

    if (selectedActivities) {
        for (const activity of selectedActivities) {
            if (activity !== null) {
                const categoryName = activity.category.name;
                categoryCounts.set(
                    categoryName,
                    (categoryCounts.get(categoryName) || 0) + 1
                );
            }
        }

        const categoryCount = categoryCounts.get(category) || 0;
        const diversityFactor =
            categoryCount > 0
                ? category === clientCategories.Resturants
                    ? 1 / (2 * categoryCount)
                    : 1 / categoryCount
                : 1;
        return diversityFactor;
    }
    return 1;
}
