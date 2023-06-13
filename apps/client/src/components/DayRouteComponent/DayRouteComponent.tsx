import { Paper, Stack } from "@mui/material";
import IDailyRoute from "../../interfaces/activity/dailyRoute";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OneStopInDayRouteComponent from "../OneStopInDayRouteComponent/OneStopInDayRouteComponent";
import { ITripActivity } from "../../interfaces";

interface props {
  dayRoute: IDailyRoute;
}

const DayRouteComponent = ({ dayRoute }: props) => {
  return (
    <Paper
    style={{
      height: '600px', // Set the height to occupy the full height
      overflow: 'scroll', // Enable scrolling if the content exceeds the height
      backgroundColor:'transparent',
      margin: '8%',
      boxShadow: 'none',
    }}
  >
      <LocationOnIcon sx={{ color: "#86eaf0" }}></LocationOnIcon>
      {dayRoute.activities.map((activity) => (
        <OneStopInDayRouteComponent
          activity={activity as ITripActivity}
        ></OneStopInDayRouteComponent>
      ))}
    </Paper>
  );
};

export default DayRouteComponent;
