import { useState } from "react";
import ITrip from "../../interfaces/activity/trip";
import { Grid, Pagination, ThemeProvider, createTheme } from "@mui/material";
import DayRouteComponent from "../DayRouteComponent/DayRouteComponent";

interface props {
  trip: ITrip;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#86eaf0",
    },
    action: {
      hover: "rgba(0, 0, 0, .2)", // Custom color for hover state
    },
    text: {
      primary: "white",
    },
  },
});

const CalculatedTripComponent = ({ trip }: props) => {
  const [activeDayTrip, setActiveDayTrip] = useState(0);

  const handleDayChange = (index: number) => {
    setActiveDayTrip(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="nav-container vertical-align">
        <Pagination
          count={trip.routes.length}
          shape="rounded"
          siblingCount={1}
          boundaryCount={2}
          color="primary"
          onChange={(event, index) => handleDayChange(index - 1)}
        ></Pagination>
      </div>
      <DayRouteComponent dayRoute={trip.routes[activeDayTrip]} />
    </ThemeProvider>
  );
};

export default CalculatedTripComponent;
