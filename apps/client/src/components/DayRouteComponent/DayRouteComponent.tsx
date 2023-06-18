import { Paper, Stack } from "@mui/material";
import IDailyRoute from "../../interfaces/activity/dailyRoute";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OneStopInDayRouteComponent from "../OneStopInDayRouteComponent/OneStopInDayRouteComponent";
import { ITripActivity } from "../../interfaces";
import React, { useRef } from "react";

interface props {
  dayRoute: IDailyRoute;
}

const DayRouteComponent = ({ dayRoute }: props) => {
  const paperRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTop = 0;
    }
  }, [dayRoute]);

  return (
    <Paper
      ref={paperRef}
      style={{
        height: "580px", 
        overflow: "scroll", 
        backgroundColor: "transparent",
        marginLeft: "8%",
        boxShadow: "none",
        scrollbarWidth: 'thin',
        scrollbarColor:'white',
        marginBottom:'3%'
      }}
    >
      <LocationOnIcon sx={{ color: "#86eaf0" }}></LocationOnIcon>
      {dayRoute.activities.map((activity) => (
        <OneStopInDayRouteComponent
          key={(activity as ITripActivity).activity.id}
          activity={activity as ITripActivity}
        ></OneStopInDayRouteComponent>
      ))}
    </Paper>
  );
};

export default DayRouteComponent;
