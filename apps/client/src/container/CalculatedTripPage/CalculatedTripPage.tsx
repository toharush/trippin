import CalculatedTripComponent from "../../components/CalculatedTripComponent/CalculatedTripComponent";
import Destination from "../../components/Destination/Destination";
import { useDestinations, useMapDrawer, useTrip } from "../../hooks";
import ITrip from "../../interfaces/activity/trip";

const CalculatedTripContainer = () => {
  const { trip } = useTrip();
  
    

  return (
    <>
    {trip && 
      <CalculatedTripComponent trip={trip}></CalculatedTripComponent>
    }
    </>
  );
}

export default CalculatedTripContainer;