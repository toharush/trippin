import { Stack } from "@mui/material";
import IDailyRoute from "../../interfaces/activity/dailyRoute";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OneStopInDayRouteComponent from "../OneStopInDayRouteComponent/OneStopInDayRouteComponent";
import { ITripActivity } from "../../interfaces";

interface props {
  dayRoute: IDailyRoute;
}

const DayRouteComponent = ({ dayRoute }: props) => {
  return (
    <Stack sx={{ maxWidth: 400, margin: "8%" }} spacing={1}>
      <LocationOnIcon sx={{ color: "#86eaf0" }}></LocationOnIcon>
      {dayRoute.activities.map((activity) => (
        <OneStopInDayRouteComponent
          activity={activity as ITripActivity}
        ></OneStopInDayRouteComponent>
      ))}
    </Stack>
  );
};

export default DayRouteComponent;
