import { useState } from "react";
import { isEmpty, map, uniqBy } from "lodash";
import useActivities from "./useActivities";
import L from "leaflet";
import { useMap } from "react-leaflet";

const useDestinations = () => {
  const [searchString, setSearchString] = useState("");
  const [searchResultsDests, setSearchResults] = useState<any[]>([]);
  const { activities } = useActivities();

  const destinations = uniqBy(
    map(activities, (activity) => ({
      name: activity.address.city,
      location: [activity.position.lat, activity.position.lng],
    })),
    "name"
  );

  const searchDestination = async (name: string | undefined) => {
    const newName = name ?? "";
    await setSearchString(newName);
    await find();
  };

  const find = async () => {
    let values: [] = [];
    if (searchString !== "" && !isEmpty(searchString)) {
      // @ts-ignore
      values = destinations?.filter((dest) =>
        dest.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }
    // @ts-ignore
    await setSearchResults(values);
  };

  return {
    destinations,
    searchDestination,
    searchResultsDests,
  };
};

export default useDestinations;
