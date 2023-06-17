import { useSelector } from "react-redux";
import ITrip from "../interfaces/activity/trip";
import { useAppDispatch } from "../store";
import { fetchCreateTripToServer, getAllTripsByUserId } from "../store/middlewares/trip";
import { selectAllTripsOfCurrentUser, selectSelectedTrip } from "../store/selectors/trip";
import { resetSelectedTrip, setSelectedTrip } from "../store/slices/trip";
import useActivities from "./useActivities";
import useAuthentication from "./useAuthentication";
import useDateAndTime from "./useDateAndTime";
import useDestinations from "./useDestinations";
import useUserCategoriesPriority from "./useUserCategoriesPriority";
import { useEffect } from "react";

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

  const createTrip = async () => {
    await dispatch(
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
  };

  const SetSelectedTrip = (trip: ITrip) => {
    dispatch(setSelectedTrip(trip));
  };

  const ResetSelectedTrip = () => {
    dispatch(resetSelectedTrip());
  }

  const getAllTripsOfCurrentUser = async () => {
    await dispatch(
      getAllTripsByUserId({ user_id: currentUser?.email ?? null }));
  };

  useEffect(() => {
    getAllTripsOfCurrentUser(); // Fetch trips when the user ID changes
  }, [currentUser?.email]);

    return {
      defaultRadius,
      createTrip,
      getAllTripsOfCurrentUser,
      SetSelectedTrip,
      ResetSelectedTrip,
      trips
    };
  };

  export default useTrip;
