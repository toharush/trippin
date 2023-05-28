interface Activity {
    id: string;
    type: number;
    name: string;
    location: [number,number];
    openHour: number;
    closeHour: number;
    userRate: number;
    duration: number;
  }

interface ActivityMaxValueInHour {
    id: string;
    maxValue: number;
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
  ): (Activity|null)[] {
    const availableActivities = activities.filter(
      (activity) =>
        activity.openHour <= endHour && activity.closeHour >= startHour
    );
  
    const dp: number[] = new Array(availableActivities.length).fill(0);
  
    const selectedActivities: (Activity | null)[][] = new Array(
      availableActivities.length
    ).fill(null).map(() => new Array(endHour - startHour).fill(null));
  
    for (let activitiesCombination = 0; activitiesCombination < availableActivities.length; activitiesCombination++) {
      const reorderedActivities = changeStartActivity(
        availableActivities,
        activitiesCombination
      );
      const combinationDp: number[] = new Array(
        endHour - startHour
      ).fill(0);
  
      for (let hour = startHour; hour < endHour; hour++) {
        let bestValueActivity: Activity | null = null;
  
        if (selectedActivities[activitiesCombination][hour - startHour] === null) {
          let maxValueOfHour = combinationDp[hour - startHour];
  
          for (const activity of reorderedActivities) {
            const lastSelectedActivity = getLastSelectedActivity(
              selectedActivities[activitiesCombination]
            );
  
            let distance: number;
            if (hour - startHour !== 0 && lastSelectedActivity !== null) {
              distance = calculateDistance(
                activity.location,
                lastSelectedActivity.location
              );
            } else {
              distance = 1.0;
            }
  
            const activityValue = activity.userRate / distance;
  
            if (
              activity.openHour <= hour &&
              hour + activity.duration <= activity.closeHour &&
              hour + activity.duration <= endHour
            ) {
              if (activityValue > maxValueOfHour) {
                maxValueOfHour = activityValue;
                combinationDp[hour - startHour] = maxValueOfHour;
                bestValueActivity = activity;
              }
            }
          }
  
          dp[activitiesCombination] += maxValueOfHour;
  
          if (bestValueActivity !== null) {
            for (
              let i = 0;
              i < bestValueActivity.duration;
              i++
            ) {
              selectedActivities[activitiesCombination][hour - startHour + i] = bestValueActivity;
            }
  
            reorderedActivities.splice(
              reorderedActivities.indexOf(bestValueActivity),
              1
            );
          }
        }
      }
    }
    console.log(selectedActivities);
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
  ): (Activity|null)[] {
    const maxValue = Math.max(...dp);
    const maxIndex = dp.indexOf(maxValue);
    return selectedActivities[maxIndex];
  }
  
  const activities: Activity[] = [
    {id: "1", type: 2, name: "Park Place, Tulsa, OK, United States", location: [36.13506, -95.97135], openHour: 6, closeHour: 23, userRate: 5.1, duration: 2},
    {id: "2", type: 2, name: "Popeyes Louisiana Kitchen", location: [33.56812, -92.67983], openHour: 8, closeHour: 15, userRate: 5.1, duration: 1},
    {id: "3", type: 2, name: "Whiting Cafe", location: [39.59027, -95.61215], openHour: 9, closeHour: 11, userRate: 3.5, duration: 1.5},
    {id: "4", type: 2, name: "Woods at Sau Tech Diner", location: [33.63206, -92.71822], openHour: 10, closeHour: 17, userRate: 6.2, duration: 3},
    {id: "5", type: 2, name: "Rick's Place Bar and Grill", location: [37.5281, -95.80044], openHour: 9, closeHour: 18, userRate: 4.8, duration: 2}
  ];
  
  const startHour = 9;
  const endHour = 17;
  
  const bestActivities = findBestActivities(activities, startHour, endHour);
  
  
  for (const activity of bestActivities) {
    if (activity === null) {
      console.log("Free time :)");
    } else {
      console.log(activity.id);
    }
  }