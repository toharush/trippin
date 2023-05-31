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

function calculateDistance(location1: [number, number], location2: [number, number]): number {
  const radius = 6371.0;

  const [lat1, lon1] = location1.map((coord) => (Math.PI * coord) / 180);
  const [lat2, lon2] = location2.map((coord) => (Math.PI * coord) / 180);

  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = radius * c;

  return distance;
}


function findBestActivities(
  activities: Activity[],
  startHour: number,
  endHour: number
): (Activity | null)[] {
  const availableActivities = activities.filter(
    (activity) =>
      activity.openHour <= endHour && activity.closeHour >= startHour
  );

  const dp: number[] = new Array(availableActivities.length).fill(0);

  const selectedActivities: (Activity | null)[][] = new Array(
    availableActivities.length
  ).fill(null).map(() => new Array(endHour * 4 - startHour * 4).fill(null));

  for (let activitiesCombination = 0; activitiesCombination < availableActivities.length; activitiesCombination++) {
    const reorderedActivities = changeStartActivity(
      availableActivities,
      activitiesCombination
    );
    const combinationDp: number[] = new Array(
      endHour * 4 - startHour * 4
    ).fill(0);

    for (let currentHour = startHour; currentHour < calcActivityEndHour(startHour, endHour); currentHour++) {
      let bestValueActivity: Activity | null = null;
      let timeSlot = currentHour - startHour;
      let maxValueOfTimeSlot = combinationDp[timeSlot];

      for (const activity of reorderedActivities) {
        const lastSelectedActivity = getLastSelectedActivity(
          selectedActivities[activitiesCombination]
        );

        let distance: number;
        if (timeSlot !== 0 && lastSelectedActivity !== null) {
          distance = calculateDistance(
            activity.location,
            lastSelectedActivity.location
          );
        } else {
          distance = 1.0;
        }

        activity.travelAndVisitTime = roundTravelTime(activity.duration * 4) + roundTravelTime((distance / avgSpeed) * 4);
        const activityValue = activity.userRate / distance;
        console.log("activity id: " + activity.id + " travelTime: " + activity.travelAndVisitTime);
        if (
          activity.openHour <= currentHour &&
          currentHour + activity.travelAndVisitTime <= calcActivityEndHour(activity.openHour, activity.closeHour) &&
          currentHour + activity.travelAndVisitTime <= calcActivityEndHour(startHour, endHour)
        ) {
          if (activityValue > maxValueOfTimeSlot) {
            maxValueOfTimeSlot = activityValue;
            combinationDp[timeSlot] = maxValueOfTimeSlot;
            bestValueActivity = activity;
          }
        }
      }

      dp[activitiesCombination] += maxValueOfTimeSlot;

      if (bestValueActivity !== null && bestValueActivity.travelAndVisitTime !== undefined) {
        for (let i = 0; i < bestValueActivity.travelAndVisitTime; i++) {
          selectedActivities[activitiesCombination][timeSlot + i] = bestValueActivity;
        }
        currentHour += bestValueActivity.travelAndVisitTime - 1;
        reorderedActivities.splice(reorderedActivities.indexOf(bestValueActivity), 1);
      }
    }
  }
  return getBestDayRoute(dp, selectedActivities);
}

function changeStartActivity(
  activities: Activity[],
  firstActivityIndex: number
): Activity[] {
  if (firstActivityIndex >= activities.length) {
    throw new Error("FirstItemIndex is out of range");
  }

  const modifiedArray = [
    activities[firstActivityIndex],
    ...activities.slice(0, firstActivityIndex),
    ...activities.slice(firstActivityIndex + 1),
  ];

  return modifiedArray;
}

function calcActivityEndHour(start: number, end: number): number {
  return ((end - start) * 4) + start;
}

function roundTravelTime(number: number): number {
  return number > 1 ? Math.round(number) : 1;
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

function getBestDayRoute(
  dp: number[],
  selectedActivities: (Activity | null)[][]
): (Activity | null)[] {
  const maxValue = Math.max(...dp);
  const maxIndex = dp.indexOf(maxValue);
  return selectedActivities[maxIndex];
}

const activities: Activity[] = [
  { id: "1", type: 2, name: "Park Place, Tulsa, OK, United States", location: [51.519877166287486, -0.20420128478308805], openHour: 6, closeHour: 23, userRate: 5.1, duration: 2 },
  { id: "2", type: 2, name: "Popeyes Louisiana Kitchen", location: [51.51761205306819, -0.20578971303352855], openHour: 8, closeHour: 23, userRate: 5.1, duration: 1 },
  { id: "3", type: 2, name: "Whiting Cafe", location: [51.517076646210405, -0.2112830273996354], openHour: 9, closeHour: 23, userRate: 4.8, duration: 1.5 },
  { id: "4", type: 2, name: "Woods at Sau Tech Diner", location: [51.50838570095298, -0.22121070396488873], openHour: 10, closeHour: 23, userRate: 6.2, duration: 3 },
  { id: "5", type: 2, name: "Rick's Place Bar and Grill", location: [51.50039351073569, -0.20003166073033746], openHour: 9, closeHour: 23, userRate: 3.5, duration: 0.5 }
];

const startHour = 9;
const endHour = 17;
const avgSpeed = 27.5;

const bestActivities = findBestActivities(activities, startHour, endHour);

for (const activity of bestActivities) {
  if (activity === null) {
    console.log("Free time :)");
  } else {
    console.log(activity.id);
  }
}
