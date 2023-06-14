import { Activity, ITripActivity } from "../interfaces";
import ICoordinate from "../interfaces/activity/coordinate";

export const calculateCenterPointOfActivity = (
  activities: (Activity | ITripActivity)[]
): ICoordinate => {
  let sumLatitude = 0;
  let sumLongitude = 0;

  activities.map((currentCityCoordinate) => {
    if ("activity" in currentCityCoordinate) {
      currentCityCoordinate = currentCityCoordinate.activity;
    }
    sumLatitude += currentCityCoordinate.position.lat;
    sumLongitude += currentCityCoordinate.position.lng;
  });

  return {
    lat: sumLatitude / activities.length,
    lng: sumLongitude / activities.length,
  };
};
