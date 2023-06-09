import { BestDayRouteConsts } from "./bestDayRouteConstants";
import { calculateDistance } from "../controllers/MapCalculation";
import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import { Activity } from "../../../client/src/interfaces";
import { filter } from "lodash";

export function findBestActivities(
  activities: Activity[],
  startHour: number,
  endHour: number,
  startPosition: ICoordinate
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
        } else if (!compareLocations(startPosition, activity.position)) {
          distance = calculateDistance(startPosition, activity.position);
        }
        activity.travelAndVisitTime =
          distance !== 0
            ? calcActivityTravelAndVisitTime(activity.duration, distance)
            : activity.duration * BestDayRouteConsts.SplitToQuarter;
        const activityValue = activity.rate! / (distance + 1);
        if (
          isActivityOpenNow(activity, currentHour, startHour, endHour) &&
          activityValue > maxValueOfTimeSlot
        ) {
          maxValueOfTimeSlot = activityValue;
          currentCombinationValues[currentTimeSlot] = maxValueOfTimeSlot;
          selectedActivity = activity;
        }
      }
      combinationsValue[activitiesCombinationIndex] += maxValueOfTimeSlot;
      if (
        selectedActivity !== null &&
        selectedActivity.travelAndVisitTime !== undefined
      ) {
        for (let i = 0; i < selectedActivity.travelAndVisitTime; i++) {
          selectedActivitiesCombinations[activitiesCombinationIndex][
            currentTimeSlot + i
          ] = selectedActivity;
        }
        currentHour += selectedActivity.travelAndVisitTime - 1;
        reorderedActivities = removeActivityById(
          reorderedActivities,
          selectedActivity.id
        );
      }
    }
  }

  return getBestDayRoute(combinationsValue, selectedActivitiesCombinations);
}

function filterActivitiesOutOfUserTimeRange(
  activities: Activity[],
  startHour: number,
  endHour: number
): Activity[] {
  return filter(
    activities,
    (activity) =>
      activity.open_hour <= endHour && activity.close_hour >= startHour
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
        endHour * BestDayRouteConsts.SplitToQuarter -
          startHour * BestDayRouteConsts.SplitToQuarter
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
    endHour * BestDayRouteConsts.SplitToQuarter -
      startHour * BestDayRouteConsts.SplitToQuarter
  ).fill(0);
}

function calcActivityEndHour(start: number, end: number): number {
  return (end - start) * BestDayRouteConsts.SplitToQuarter + start;
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
    roundTravelTime(duration * BestDayRouteConsts.SplitToQuarter) +
    roundTravelTime(
      (distance / BestDayRouteConsts.AverageSpeed) *
        BestDayRouteConsts.SplitToQuarter
    )
  );
}

function isActivityOpenNow(
  activity: Activity,
  currentHour: number,
  startHour: number,
  endHour: number
): boolean {
  return activity.travelAndVisitTime
    ? activity.open_hour <= currentHour &&
        currentHour + activity.travelAndVisitTime <=
          calcActivityEndHour(activity.open_hour, activity.close_hour) &&
        currentHour + activity.travelAndVisitTime <=
          calcActivityEndHour(startHour, endHour)
    : false;
}

function roundTravelTime(number: number): number {
  return number > BestDayRouteConsts.MinimalTravelTimeSlot
    ? Math.round(number)
    : BestDayRouteConsts.MinimalTravelTimeSlot;
}

const removeActivityById = (activities: Activity[], id: string): Activity[] => {
  return filter(activities, (activity) => activity.id !== id);
};

const getActivityDuration = (activity: Activity): number => {
  if (activity.google.spend) {
    return activity.google.spend / 3600000;
  }
  return 2;
};

function filterDuplicateActivities(
  selectedActivities: (Activity | null)[]
): Activity[] {
  const filteredActivities: Activity[] = [];
  const activitySet = new Set<String>();

  console.log("selectedActivities", selectedActivities);

  for (let i = 0; i < selectedActivities?.length; i++) {
    if (
      selectedActivities[i] !== null &&
      !activitySet.has(selectedActivities[i]!.id)
    ) {
      filteredActivities.push(selectedActivities[i]!);
      activitySet.add(selectedActivities[i]!.id);
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
