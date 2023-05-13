import { useSelector } from "react-redux";
import { selectTrips } from "../store/selectors/trip";
import { useEffect } from "react";
import useAuthentication from "./useAuthentication";
import { useAppDispatch } from "../store";
import { fetchTrips } from "../store/middlewares/trip";

const useTrip = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuthentication();
  const trips = useSelector(selectTrips);

  useEffect(() => {
    
    if (currentUser) {
        console.log(currentUser)
      fetchAllTrips();
    }
  }, [currentUser]);

  const fetchAllTrips = async () => {
    await dispatch(fetchTrips());
  };

  return {
    trips,
  };
};

export default useTrip;
