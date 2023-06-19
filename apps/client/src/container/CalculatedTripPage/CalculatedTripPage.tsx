import { useState } from "react";
import CalculatedTripComponent from "../../components/CalculatedTripComponent/CalculatedTripComponent";
import { useTrip } from "../../hooks";
import Loader from "../../components/loader/Loader";
import "./CalculatedTripPage.css";

const CalculatedTripContainer = () => {
  const { selectedTrip, loading } = useTrip();
  const [activeDayTrip, setActiveDayTrip] = useState(0);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Loader isBlack={true} />
        </div>
      ) : (
        selectedTrip && (
          <CalculatedTripComponent
            trip={selectedTrip}
            activeDayTrip={activeDayTrip}
            setActiveDayTrip={setActiveDayTrip}
          />
        )
      )}
    </>
  );
};

export default CalculatedTripContainer;
