import Destination from "../../components/Destination/Destination";
import { useMapDrawer } from "../../hooks";

interface props {
  name: string;
  position: [number, number];
}

const DestinationContainer = ({name,position}:props) => {

  const { setFlyTo } = useMapDrawer();
  const handleFlyTo = () => setFlyTo(position, 8);

  return (
    <Destination name={name} handleFlyTo={handleFlyTo}></Destination>
  );
}

export default DestinationContainer;