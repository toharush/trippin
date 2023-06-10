import Destination from "../../components/Destination/Destination";
import { useDestinations, useMapDrawer } from "../../hooks";

interface props {
  name: string;
  position: [number, number];
}

const DestinationContainer = ({ name, position }: props) => {

  const { setFlyTo } = useMapDrawer();
  const { setSelectedDestination } = useDestinations();

  const handleClick = () => {
    setFlyTo(position, 8);
    setSelectedDestination(name);
  }

  return (
    <Destination name={name} handleClick={handleClick}></Destination>
  );
}

export default DestinationContainer;