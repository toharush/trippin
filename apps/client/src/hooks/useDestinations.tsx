import { map, uniqBy } from "lodash";
import useActivities from "./useActivities";

const useDestinations = () => {
  const { activities } = useActivities();

  const destinations = uniqBy(
    map(activities, (activity) => ({
      name: activity.address.city,
      location: [activity.position.lat, activity.position.lng],
    })),
    "name"
  );

  return {
    destinations,
  };
};

export default useDestinations;
