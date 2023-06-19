import { useSelector } from "react-redux";
import ITrip from "../interfaces/activity/trip";
import { useAppDispatch } from "../store";
import { fetchCreateTripToServer, getAllTripsByUserId } from "../store/middlewares/trip";
import { selectAllTripsOfCurrentUser, selectSelectedTrip } from "../store/selectors/trip";
import { addTrip, removeTrip, resetSelectedTrip, setSelectedTrip, setTrips } from "../store/slices/trip";
import useActivities from "./useActivities";
import useAuthentication from "./useAuthentication";
import useDateAndTime from "./useDateAndTime";
import useDestinations from "./useDestinations";
import useUserCategoriesPriority from "./useUserCategoriesPriority";
import { useEffect, useMemo } from "react";
import { deleteTrip } from "../store/middlewares/trip";

const useTrip = () => {
  const dispatch = useAppDispatch();
  const defaultRadius = 50;
  const { selectedDestination } = useDestinations();
  const { currentUser } = useAuthentication();
  const { selectedActivities } = useActivities();
  const { userCategoriesPriority } = useUserCategoriesPriority();
  const { dateAndTime } = useDateAndTime();
  const selectedTrip = useSelector(selectSelectedTrip);
  const trips = useSelector(selectAllTripsOfCurrentUser);
  const memoizedCurrentUser = useMemo(() => currentUser, [currentUser]);

  const createTrip = async () => {
    const newTrip = await dispatch(
      fetchCreateTripToServer({
        user_id: currentUser?.email ?? null,
        cityName: selectedDestination.name,
        cityCenter: {
          lat: selectedDestination.cityCenter.lat,
          lng: selectedDestination.cityCenter.lng,
        },
        radius: defaultRadius,
        categoryPriorities: userCategoriesPriority,
        selectedActivities: selectedActivities,
        startDate: dateAndTime.departureDate.toDate().getTime(),
        endDate: dateAndTime.returnDate.toDate().getTime(),
        startHour: dateAndTime.daytripStartTime.toDate().getTime(),
        endHour: dateAndTime.daytripEndTime.toDate().getTime(),
      })
    );
    if (newTrip.payload) {
      const trip = newTrip.payload as ITrip;
      dispatch(addTrip(trip));
    }
  };

  const SetSelectedTrip = (trip: ITrip) => {
    dispatch(setSelectedTrip(trip));
  };

  const ResetSelectedTrip = () => {
    dispatch(resetSelectedTrip());
  }

  const getAllTripsOfCurrentUser = async () => {
    const tripsOfCurrentUser = await dispatch(getAllTripsByUserId({ user_id: currentUser?.email ?? null }));
    if (tripsOfCurrentUser.payload) {
      const trips = tripsOfCurrentUser.payload as ITrip[];
      dispatch(setTrips(trips));
    }
  };

  useEffect(() => {
    getAllTripsOfCurrentUser(); // Fetch trips when the user ID changes
  }, [memoizedCurrentUser]);

  const deleteTripById = async (trip_id: number) => {
    const result = await dispatch(deleteTrip({ trip_id }));
    if (result) {
      dispatch(removeTrip(trip_id));
    }
  };

  return {
    defaultRadius,
    createTrip,
    getAllTripsOfCurrentUser,
    SetSelectedTrip,
    ResetSelectedTrip,
    trips,
    deleteTripById,
  };
};

export default useTrip;
