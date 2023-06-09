import ICoordinate from "../../../client/src/interfaces/activity/coordinate";
import { calculateCityCenterPoint } from "../algorithm/calculateCityCenter";
import turf, { BBox } from "@turf/turf";

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
    {
      units: "kilometers",
    }
  );

export const getPointsInCircle = (
  points: ICoordinate[],
  radius: number,
  center: ICoordinate
) => points.filter((point) => calculateDistance(point, center) <= radius);

export const getCityCenter = (cityCoordinates: ICoordinate[]): ICoordinate => {
  return calculateCityCenterPoint(cityCoordinates);
};

export const randomPoint = (bbox: BBox): ICoordinate => {
  const randomPoint = turf.randomPoint(1, {
    bbox: turf.bbox(bbox),
  });
  const point = randomPoint.features[0].geometry.coordinates;

  return {
    lat: point[1],
    lng: point[0],
  };
};
