import { useSelector } from "react-redux";
import {
  selectSelectedTript,
  selectSelectedTriptId,
  selectTrips,
} from "../store/selectors/trip";
import { useEffect } from "react";
import useAuthentication from "./useAuthentication";
import { useAppDispatch } from "../store";
import { fetchTrips } from "../store/middlewares/trip";
import useActivities from "./useActivities";
import useMapDrawer from "./useMapDrawer";
import { setSelectedTrip } from "../store/slices/trip";

const useTrip = () => {
  const dispatch = useAppDispatch();
  const { clearSelectedActivities, addSelectedActivity } = useActivities();
  const { clearMap } = useMapDrawer();
  const { currentUser } = useAuthentication();
  const trips = useSelector(selectTrips);
  const selectedTrip = useSelector(selectSelectedTript);

  useEffect(() => {
    if (!selectedTrip) {
      fetchAllTrips();
    } else {
      selectedTrip.routes.map((route) =>
        route.activities.map((activity, index) => addSelectedActivity(activity))
      );
    }
  }, [currentUser, selectedTrip]);

  const fetchAllTrips = async () => {
    await dispatch(fetchTrips({ username: currentUser?.email ?? undefined }));
  };

  const selectTrip = (tripId: number) => {
    dispatch(setSelectedTrip(tripId));
    clearSelectedActivities();
    clearMap();
  };

  return {
    trips,
    selectedTrip,
    selectTrip,
  };
};

export default useTrip;
