import "./Destination.css";
import { useMap } from "react-leaflet";

interface props {
  name: string;
  position: [number,number];
}

export default function Destination({ name,position }: props) {

    const map = useMap();
    const handleFlyTo =()=> {
      map.flyTo(position,8);
    }

  return (
    <div className="max-h-400 md:max-h-none md:max-h-200 flex flex-row bg-white rounded-lg p-4 shadow-lg m-3">
    <div className="flex flex-col justify-between ml-4 w-2/3">
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>

      <button
        className="bg-main text-white font-bold py-2 px-4 rounded"
        onClick={handleFlyTo}
      > Go
      </button>
    </div>
  </div>
  );
}
