import { useState } from "react";
import CalculatedTripComponent from "../../components/CalculatedTripComponent/CalcTripComponent";
import { useTrip } from "../../hooks";
import Loader from "../../components/loader/Loader";

const CalculatedTripContainer = () => {
  const { trip, loading } = useTrip();
  const [activeDayTrip, setActiveDayTrip] = useState(0);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Loader isBlack={true} />
        </div>
      ) : (
        trip && (
          <CalculatedTripComponent
            trip={trip}
            activeDayTrip={activeDayTrip}
            setActiveDayTrip={setActiveDayTrip}
          />
        )
      )}
    </>
  );
};

export default CalculatedTripContainer;
