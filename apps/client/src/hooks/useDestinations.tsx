import { groupBy, map, uniqBy } from "lodash";
import useActivities from "./useActivities";
import turf from "turf";
import { Feature, GeoJsonProperties } from "geojson";

const useDestinations = () => {
  const { activities } = useActivities();

  const LocationBy = groupBy(
    map(activities, (activity) => ({
      name: activity.address.city,
      location: [activity.position.lat, activity.position.lng],
    })),
    "name"
  );

  const getCityCenter = (name: string) => {
    let feature: Feature<any, GeoJsonProperties>[] = [];

    LocationBy[name].map((loc) =>
      feature.push(createPoint([loc.location[1], loc.location[0]]))
    );

    const featureCollection = turf.featureCollection(feature);
    const centroid = turf.center(featureCollection);

    return {
      lat: centroid.geometry.coordinates[1],
      lng: centroid.geometry.coordinates[0],
    };
  };

  const createPoint = (location: [number, number]) => turf.point(location);

  const destinations = Object.keys(LocationBy).map((dest) => ({
    name: dest,
    location: getCityCenter(dest),
  }));

  return {
    destinations,
  };
};

export default useDestinations;
