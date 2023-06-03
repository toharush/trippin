import { BestDayRouteConsts } from "./bestDayRoute.constants";

interface Activity {
  id: string;
  type: number;
  name: string;
  location: [number, number];
  openHour: number;
  closeHour: number;
  userRate: number;
  duration: number;
  travelAndVisitTime?: number;
}

function findBestActivities(activities: Activity[], startHour: number, endHour: number, startLocation: [number, number]): (Activity | null)[] {
  const availableActivities = filterActivitiesOutOfUserTimeRange(activities, startHour, endHour);
  const combinationsValue: number[] = new Array(availableActivities.length).fill(0);
  const selectedActivitiesCombinations: (Activity | null)[][] = initSelectedActivities(availableActivities, startHour, endHour);
  for (let activitiesCombinationIndex = 0; activitiesCombinationIndex < availableActivities.length; activitiesCombinationIndex++) {
    let reorderedActivities = reorderAvailableActivities(availableActivities, activitiesCombinationIndex);
    const currentCombinationValues: number[] = initCurrentCombinationValues(startHour, endHour);
    for (let currentHour = startHour; currentHour < calcActivityEndHour(startHour, endHour); currentHour++) {
      let selectedActivity: Activity | null = null;
      let currentTimeSlot = currentHour - startHour;
      let maxValueOfTimeSlot = currentCombinationValues[currentTimeSlot];
      for (const activity of reorderedActivities) {
        const lastSelectedActivity = getLastSelectedActivity(selectedActivitiesCombinations[activitiesCombinationIndex]);
        let distance: number = 0;
        if (currentTimeSlot !== 0 && lastSelectedActivity !== null) {
          distance = calculateDistance(activity.location, lastSelectedActivity.location);
        } else if (!compareLocations(startLocation, activity.location)) {
          distance = calculateDistance(startLocation, activity.location);
        }
        activity.travelAndVisitTime = distance !== 0 ? calcActivityTravelAndVisitTime(activity.duration, distance) :
          activity.duration * BestDayRouteConsts.SplitToQuarter;
        const activityValue = activity.userRate / (distance + 1);
        console.log("activity id: " + activity.id + " travelTime: " + activity.travelAndVisitTime);
        if (isActivityOpenNow(activity, currentHour) && (activityValue > maxValueOfTimeSlot)) {
          maxValueOfTimeSlot = activityValue;
          currentCombinationValues[currentTimeSlot] = maxValueOfTimeSlot;
          selectedActivity = activity;
        }
      }
      combinationsValue[activitiesCombinationIndex] += maxValueOfTimeSlot;
      if (selectedActivity !== null && selectedActivity.travelAndVisitTime !== undefined) {
        for (let i = 0; i < selectedActivity.travelAndVisitTime; i++) {
          selectedActivitiesCombinations[activitiesCombinationIndex][currentTimeSlot + i] = selectedActivity;
        }
        currentHour += selectedActivity.travelAndVisitTime - 1;
        reorderedActivities = removeActivityById(reorderedActivities, selectedActivity.id);
      }
    }
  }
  return getBestDayRoute(combinationsValue, selectedActivitiesCombinations);
}

function filterActivitiesOutOfUserTimeRange(activities: Activity[], startHour: number, endHour: number): Activity[] {
  return activities.filter(
    (activity) =>
      activity.openHour <= endHour && activity.closeHour >= startHour
  );
}

function initSelectedActivities(activities: Activity[], startHour: number, endHour: number): (Activity | null)[][] {
  return new Array(
    activities.length
  ).fill(null).map(() => new Array(endHour * BestDayRouteConsts.SplitToQuarter - startHour * BestDayRouteConsts.SplitToQuarter).fill(null));
}

function reorderAvailableActivities(activities: Activity[], firstActivityIndex: number): Activity[] {
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

function initCurrentCombinationValues(startHour: number, endHour: number): number[] {
  return new Array(
    endHour * BestDayRouteConsts.SplitToQuarter - startHour * BestDayRouteConsts.SplitToQuarter
  ).fill(0);
}

function calcActivityEndHour(start: number, end: number): number {
  return ((end - start) * BestDayRouteConsts.SplitToQuarter) + start;
}

function getLastSelectedActivity(
  activities: (Activity | null)[]
): Activity | null {
  for (let i = activities.length - 1; i >= 0; i--) {
    if (activities[i] !== null) {
      return activities[i];
    }
  }
  return null;
}

function compareLocations(location1: [number, number], location2: [number, number]): boolean {
  return location1[0] === location2[0] && location1[1] === location2[1];
}

function calculateDistance(location1: [number, number], location2: [number, number]): number {

  const [lat1, lon1] = location1.map((coord) => (Math.PI * coord) / 180);
  const [lat2, lon2] = location2.map((coord) => (Math.PI * coord) / 180);

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = BestDayRouteConsts.EarthRadius * c;

  return distance;
}

function calcActivityTravelAndVisitTime(duration: number, distance: number): number {
  return roundTravelTime(duration * BestDayRouteConsts.SplitToQuarter)
    + roundTravelTime((distance / BestDayRouteConsts.AverageSpeed)
      * BestDayRouteConsts.SplitToQuarter);
}

function isActivityOpenNow(activity: Activity, currentHour: number): boolean {
  return activity.travelAndVisitTime ? activity.openHour <= currentHour &&
    currentHour + activity.travelAndVisitTime <= calcActivityEndHour(activity.openHour, activity.closeHour) &&
    currentHour + activity.travelAndVisitTime <= calcActivityEndHour(startHour, endHour) : false;
}

function roundTravelTime(number: number): number {
  return number > BestDayRouteConsts.MinimalTravelTimeSlot ? Math.round(number) : BestDayRouteConsts.MinimalTravelTimeSlot;
}

const removeActivityById = (activities: Activity[], id: string): Activity[] => {
  return activities.filter((activity) => activity.id !== id);
};


function getBestDayRoute(
  dp: number[],
  selectedActivities: (Activity | null)[][]
): (Activity | null)[] {
  const maxValue = Math.max(...dp);
  const maxIndex = dp.indexOf(maxValue);
  return selectedActivities[maxIndex];
}

// test algo 

const activities: Activity[] = [
  { id: "1", type: 2, name: "Park Place, Tulsa, OK, United States", location: [51.519877166287486, -0.20420128478308805], openHour: 6, closeHour: 23, userRate: 30, duration: 2 },
  { id: "2", type: 2, name: "Popeyes Louisiana Kitchen", location: [51.51761205306819, -0.20578971303352855], openHour: 8, closeHour: 23, userRate: 45, duration: 1 },
  { id: "3", type: 2, name: "Whiting Cafe", location: [51.517076646210405, -0.2112830273996354], openHour: 9, closeHour: 23, userRate: 4.8, duration: 1.5 },
  { id: "4", type: 2, name: "Woods at Sau Tech Diner", location: [51.50838570095298, -0.22121070396488873], openHour: 10, closeHour: 23, userRate: 6.2, duration: 3 },
  { id: "5", type: 2, name: "Rick's Place Bar and Grill", location: [51.50039351073569, -0.20003166073033746], openHour: 9, closeHour: 23, userRate: 3.5, duration: 0.5 }
];

const startHour = 9;
const endHour = 17;

const bestActivities = findBestActivities(activities, startHour, endHour, [51.519877166287486, -0.20420128478308805]);

for (const activity of bestActivities) {
  if (activity === null) {
    console.log("Free time :)");
  } else {
    console.log(activity.id);
  }
}
