import { BestDayRouteConsts } from "./bestDayRouteConstants";
import { calculateDistance } from "../controllers/MapCalculation";
import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import { Activity } from "../../../client/src/interfaces";
const dayjs = require('dayjs');



export function findBestActivities(activities: Activity[], startHour: number, endHour: number, startPosition: ICoordinate, date: Date ): Activity[] {
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
        activity.duration = getActivityDuration(activity);
        const lastSelectedActivity = getLastSelectedActivity(selectedActivitiesCombinations[activitiesCombinationIndex]);
        let distance: number = 0;
        if (currentTimeSlot !== 0 && lastSelectedActivity !== null) {
          distance = calculateDistance(activity.position, lastSelectedActivity.position);
        } else if (!compareLocations(startPosition, activity.position)) {
          distance = calculateDistance(startPosition, activity.position);
        }
        activity.travelAndVisitTime = distance !== 0 ? calcActivityTravelAndVisitTime(activity.duration, distance) :
          activity.duration * BestDayRouteConsts.SplitToQuarter;
        const activityValue = activity.rate! / (distance + 1);
        if (isActivityOpenNow(activity, currentHour, startHour, endHour) && (activityValue > maxValueOfTimeSlot)) {
          maxValueOfTimeSlot = activityValue;
          currentCombinationValues[currentTimeSlot] = maxValueOfTimeSlot;
          selectedActivity = activity;
        }
      }
      combinationsValue[activitiesCombinationIndex] += maxValueOfTimeSlot;
      if (selectedActivity !== null && selectedActivity.travelAndVisitTime !== undefined) {
        let activityStartTime = (currentTimeSlot + calcActivityTravelTime(selectedActivity.travelAndVisitTime,selectedActivity.duration!))
                                /BestDayRouteConsts.SplitToQuarter + startHour;
        selectedActivity = setActivityTimeRange(selectedActivity,activityStartTime,date);
        for (let i = 0; i < selectedActivity.travelAndVisitTime!; i++) {
          selectedActivitiesCombinations[activitiesCombinationIndex][currentTimeSlot + i] = selectedActivity;
        }
        currentHour += selectedActivity.travelAndVisitTime! - 1;
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

function compareLocations(firstPosition: ICoordinate, secondPosition: ICoordinate): boolean {
  return firstPosition.lat === secondPosition.lat && firstPosition.lng === secondPosition.lng;
}

function calcActivityTravelAndVisitTime(duration: number, distance: number): number {
  return roundTravelTime(duration * BestDayRouteConsts.SplitToQuarter)
    + roundTravelTime((distance / BestDayRouteConsts.AverageSpeed)
      * BestDayRouteConsts.SplitToQuarter);
}

function calcActivityTravelTime(travelAndVisitTime: number, duration:number): number {
  return travelAndVisitTime-(duration*BestDayRouteConsts.SplitToQuarter);
}

function isActivityOpenNow(activity: Activity, currentHour: number, startHour: number, endHour: number): boolean {
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

const getActivityDuration = (
  activity: Activity
): number => {
  if (activity.google?.spend) {
    return (activity.google.spend) / 3600000;
  }
  return activity.duration!;
}

function filterDuplicateActivities(selectedActivities: (Activity | null)[]): Activity[] {
  const filteredActivities: Activity[] = [];
  const activitySet = new Set<String>(); 

  for (let i=0; i<selectedActivities?.length; i++) {
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

function convertTimeSlotToDate(date : Date, time: number) : Date {
  const hour = Math.floor(time);
  const minute = Math.round((time - hour) * 60);

  const convertedDate = new Date(date);
  convertedDate.setHours(hour);
  convertedDate.setMinutes(minute);
  convertedDate.setSeconds(0);

  return convertedDate;
}

function setActivityTimeRange(activity: Activity, startTime: number, date:Date) : Activity {
  activity.startTime = convertTimeSlotToDate(date,startTime);
  activity.endTime = convertTimeSlotToDate(date,startTime+activity.duration!);

  return activity;
}

const activities: Activity[] = [
  { id: "1", title: "Park Place, Tulsa, OK, United States", position: {lat: 51.519877166287486, lng: -0.20420128478308805}, openHour: 6, closeHour: 23, rate: 30, duration: 2},
  { id: "2", title: "Popeyes Louisiana Kitchen", position: {lat:51.51761205306819, lng:-0.20578971303352855}, openHour: 8, closeHour: 23, rate: 45, duration: 1 },
  { id: "3", title: "Whiting Cafe", position: {lat:51.517076646210405, lng:-0.2112830273996354}, openHour: 9, closeHour: 23, rate: 4.8, duration: 1.5 },
  { id: "4", title: "Woods at Sau Tech Diner", position: {lat:51.50838570095298, lng:-0.22121070396488873}, openHour: 10, closeHour: 23, rate: 6.2, duration: 3 },
  { id: "5", title: "Rick's Place Bar and Grill", position: {lat:51.50039351073569, lng:-0.20003166073033746}, openHour: 9, closeHour: 23, rate: 3.5, duration: 0.5 }
];

const startHour = 9;
const endHour = 17;

const bestActivities = findBestActivities(activities, startHour, endHour, {lat:51.519877166287486, lng:-0.20420128478308805}, new Date());

for (const activity of bestActivities) {
  if (activity === null) {
    console.log("Free time :)");
  } else {
    console.log(activity.id);
    console.log("Activity start time: "+activity.startTime?.toLocaleTimeString());
    console.log("Activity end time: "+activity.endTime?.toLocaleTimeString());
    console.log("travel time :"+activity.travelAndVisitTime!);
  }
}
