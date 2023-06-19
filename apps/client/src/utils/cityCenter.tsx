import { Activity, ITripActivity } from "../interfaces";
import ICoordinate from "../interfaces/activity/coordinate";
import turf from "turf";

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

export const calculateDistance = (
  firstPoint: ICoordinate,
  secPoint: ICoordinate
) =>
  turf.distance(
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [firstPoint.lng, firstPoint.lat],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [secPoint.lng, secPoint.lat],
      },
    },
    "kilometers"
  );
