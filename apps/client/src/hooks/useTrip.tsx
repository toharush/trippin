import { useSelector } from "react-redux";
import { selectTrip, useAppDispatch } from "../store";
import { fetchCreateTripToServer } from "../store/middlewares/trip";
import useActivities from "./useActivities";
import useAuthentication from "./useAuthentication";
import useDateAndTime from "./useDateAndTime";
import useDestinations from "./useDestinations";
import useUserCategoriesPriority from "./useUserCategoriesPriority";

const useTrip = () => {
  const dispatch = useAppDispatch();
  const trip = useSelector(selectTrip);
  const defaultRadius = 50;
  const { selectedDestination } = useDestinations();
  const { currentUser } = useAuthentication();
  const { selectedActivities } = useActivities();
  const { userCategoriesPriority } = useUserCategoriesPriority();
  const { dateAndTime } = useDateAndTime();

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


  return {
    defaultRadius,
    createTrip,
    trip
  };
};

export default useTrip;
