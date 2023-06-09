import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import { calculateCityCenterPoint } from "../algorithm/calculateCityCenter";
import turf from "@turf/turf";

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

export const getPointsInCircle = (
  points: ICoordinate[],
  radius: number,
  center: ICoordinate
) => points.filter((point) => calculateDistance(point, center) <= radius);

export const getCityCenter = (cityCoordinates: ICoordinate[]): ICoordinate => {
  return calculateCityCenterPoint(cityCoordinates);
};
