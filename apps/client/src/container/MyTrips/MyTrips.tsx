import Trip from "../../components/Trip/Trip";
import useTrip from "../../hooks/useTrip";

const MyTrips = () => {
  const { trips, selectTrip } = useTrip();

  return (
    <>
      {trips.map((trip) => (
        <Trip onSelect={(tripId) => selectTrip(tripId)} trip={trip} />
      ))}
    </>
  );
};

export default MyTrips;
