import { useAppDispatch } from "../store";
import { fetchCreateTripToServer } from "../store/middlewares/trip";
import useActivities from "./useActivities";
import useAuthentication from "./useAuthentication";
import useDateAndTime from "./useDateAndTime";
import useUserCategoriesPriority from "./useUserCategoriesPriority";

const useTrip = () => {
  const dispatch = useAppDispatch();
  const defaultRadius = 50;
  const defaultName = "My Trip";
  const { currentUser } = useAuthentication();
  const { selectedActivities } = useActivities();
  const { userCategoriesPriority } = useUserCategoriesPriority();
  const { dateAndTime } = useDateAndTime();

  const createTrip = async () => {
    await dispatch(
      fetchCreateTripToServer({
        user_id: currentUser?.email ?? null,
        name: defaultName,
        cityCenter: {
          lat: 55.5,
          lng: 55.5,
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
  };
};

export default useTrip;
