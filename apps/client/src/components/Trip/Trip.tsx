import ITrip from "../../interfaces/trip/trip";
import MissingPlaceImage from "../MissingPlaceImage/MissingPlaceImage";

interface ITripProps {
  trip: ITrip;
  onSelect: (tripId: number) => void;
}
const Trip = (props: ITripProps) => {
  const { trip, onSelect } = props;

  const onSelected = () => onSelect(trip.id);

  return (
    <div className="max-h-400 md:max-h-none md:max-h-200 flex flex-row bg-white rounded-lg p-4 shadow-lg m-3">
      <div className="w-1/3">
        {Boolean(trip.image_path) ? (
          <img
            src={trip.image_path}
            alt={trip.name}
            className="h-full w-full object-cover rounded-lg"
          />
        ) : (
          <MissingPlaceImage label={trip.name} />
        )}
      </div>

      <div className="flex flex-col justify-between ml-4 w-2/3">
        <div>
          <h2 className="text-xl font-semibold">{trip.name}</h2>
        </div>
        <button
          className="bg-main text-white font-bold py-2 px-4 rounded"
          onClick={onSelected}
        >
          View My Trip
        </button>
      </div>
    </div>
  );
};

export default Trip;
