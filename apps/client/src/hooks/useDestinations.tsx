import turf from "turf";
import { selectDestination, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { resetDestination, setDestination } from "../store/slices/destination";
import ICoordinate from "../interfaces/activity/coordinate";
import { groupBy, map, uniqBy } from "lodash";
import useActivities from "./useActivities";
import { Feature, GeoJsonProperties } from "geojson";

const useDestinations = () => {
  const dispatch = useAppDispatch();
  const { activities } = useActivities();
  const selectedDestination = useSelector(selectDestination);

 const setSelectedDestination = (name: string) => {
    dispatch(setDestination({ name: name, cityCenter: getCityCenter(name) }));
  }
  
  const LocationBy = groupBy(
    map(activities, (activity) => ({
      name: activity.address.city,
      location: [activity.position.lat, activity.position.lng],
    })),
    "name"
  );

  const resetSelectedDestination = () => {
    dispatch(resetDestination);
  }

  const getCityCenter = (name: string): ICoordinate => {
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
    selectedDestination,
    setSelectedDestination,
    resetSelectedDestination
  };
};

export default useDestinations;
