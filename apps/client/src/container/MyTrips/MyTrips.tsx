import useTrip from "../../hooks/useTrip";

const MyTrips = () => {
  const { trips } = useTrip();

  return (
    <>
      {trips.map((trip) => (
        <div>{trip.name}</div>
      ))}
    </>
  );
};

export default MyTrips;
