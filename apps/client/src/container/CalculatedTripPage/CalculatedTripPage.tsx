import CalculatedTripComponent from "../../components/CalculatedTripComponent/CalculatedTripComponent";
import Destination from "../../components/Destination/Destination";
import { useDestinations, useMapDrawer, useTrip } from "../../hooks";
import ITrip from "../../interfaces/activity/trip";
import { tripTest } from "./trip";

interface props {
  
}

const CalculatedTripContainer = () => {
    

  return (
    <CalculatedTripComponent trip={tripTest}></CalculatedTripComponent>
  );
}

export default CalculatedTripContainer;