import { useEffect, useState } from "react";
import CalculatedTripComponent from "../../components/CalculatedTripComponent/CalculatedTripComponent";
import Destination from "../../components/Destination/Destination";
import { useActivities, useDestinations, useMapDrawer, useTrip } from "../../hooks";
import ITrip from "../../interfaces/activity/trip";
import { ITripActivity } from "../../interfaces";
import { Route } from "@mui/icons-material";

const CalculatedTripContainer = () => {
  const { trip } = useTrip();
  const {setActivitiesRouteOnMap} = useActivities();
  const [activeDayTrip, setActiveDayTrip] = useState(0);
  const {setFlyTo} = useMapDrawer();

  useEffect(()=> {
    if(trip) {
    const currentDayActivities = trip.routes[activeDayTrip].activities;
    const firstActivity = currentDayActivities[0] as ITripActivity;
    const firstActivityLocation = firstActivity.activity.position;
    setActivitiesRouteOnMap(currentDayActivities as ITripActivity[]);
    setFlyTo([firstActivityLocation.lat,firstActivityLocation.lng],10);
    }
  },[activeDayTrip, trip])
  return (
    <>
    {trip && 
      <CalculatedTripComponent trip={trip} activeDayTrip={activeDayTrip} setActiveDayTrip={setActiveDayTrip}></CalculatedTripComponent>
    } 
    </>
  );
}

export default CalculatedTripContainer;