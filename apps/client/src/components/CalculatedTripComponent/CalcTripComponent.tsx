import { useState, useEffect } from "react";
import ITrip from "../../interfaces/activity/trip";
import {
  Button,
  Grid,
  Pagination,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import DayRouteComponent from "../DayRouteComponent/DayRouteComponent";
import "./CalculatedTripComponent.css";
import { useActivities, useMapDrawer } from "../../hooks";
import { calculateCenterPointOfActivity } from "../../utils/cityCenter";

interface props {
  trip: ITrip;
  activeDayTrip: number;
  setActiveDayTrip: (index: number) => void;
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
      primary: "#FFFFFF",
    },
  },
});

const CalculatedTripComponent = ({
  trip,
  activeDayTrip,
  setActiveDayTrip,
}: props) => {
  const { setFlyTo } = useMapDrawer();
  const { setActivitiesRouteOnMap } = useActivities();

  useEffect(() => handleDayChange(0), []);

  const handleDayChange = (index: number) => {
    const cityCenter = calculateCenterPointOfActivity(
      trip.routes[index].activities
    );
    setFlyTo([cityCenter.lat, cityCenter.lng], 10);
    setActivitiesRouteOnMap(trip.routes[index].activities);
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
        />
      </div>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" >
        <Grid item sx={{ margin:'4%', color:"white", fontSize:"large" }}>
          <h1>{trip.name}</h1>
        </Grid>
        <Grid item sx={{marginRight:'4%'}}>
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        </Grid>
      </Grid>
      {trip.routes && (
        <DayRouteComponent dayRoute={trip.routes[activeDayTrip]} />
      )}
    </ThemeProvider>
  );
};

export default CalculatedTripComponent;
