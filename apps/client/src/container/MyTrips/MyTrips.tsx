import Trip from "../../components/Trip/Trip";
import useTrip from "../../hooks/useTrip";

interface MyTripsProps {
  onSelectTrip: () => void;
}

const MyTrips = (props: MyTripsProps) => {
  const { onSelectTrip } = props;
  const { trips, selectTrip } = useTrip();

  const selectTripFromList = (tripId: number) => {
    selectTrip(tripId);
    onSelectTrip();
  }

  return (
    <>
      {trips.map((trip) => (
        <Trip onSelect={(tripId) => selectTripFromList(tripId)} trip={trip} />
      ))}
    </>
  );
};

export default MyTrips;
