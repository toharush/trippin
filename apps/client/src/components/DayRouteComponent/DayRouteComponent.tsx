import { Paper, Stack } from "@mui/material";
import IDailyRoute from "../../interfaces/activity/dailyRoute";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OneStopInDayRouteComponent from "../OneStopInDayRouteComponent/OneStopInDayRouteComponent";
import { ITripActivity } from "../../interfaces";
import React, { useRef, useState } from "react";

interface props {
  dayRoute: IDailyRoute;
}

const DayRouteComponent = ({ dayRoute }: props) => {
  const paperRef = useRef<HTMLDivElement>(null);
  const [travelTimesArray, setTravelTimesArray] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (paperRef.current) {
      paperRef.current.scrollTop = 0;
    }
    setTravelTimesArray(createTravelActivitiesArray());
  }, [dayRoute]);

  const createTravelActivitiesArray = () => {
    const travelTimes: string[] =[];
    for (let i = 1; i < dayRoute.activities.length; i++) {
      const currentActivity = dayRoute.activities[i] as ITripActivity;
      const previousActivity  = dayRoute.activities[i-1] as ITripActivity;
      const travelTime = new Date(currentActivity.start_time).getTime() - new Date(previousActivity.end_time).getTime();
      const travelTimeFormated =  millisecondsToTimeString(travelTime);
      travelTimes.push(travelTimeFormated);
    }
    return travelTimes;
  }

  const millisecondsToTimeString = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper
      ref={paperRef}
      style={{
        height: "58vh", 
        overflow: "scroll", 
        backgroundColor: "transparent",
        marginLeft: "8%",
        boxShadow: "none",
        scrollbarWidth: 'thin',
        scrollbarColor:'white',
        marginBottom:'3%'
      }}
    >
      {dayRoute.activities.map((activity,index) => (
        <OneStopInDayRouteComponent
          key={(activity as ITripActivity).activity.id}
          activity={activity as ITripActivity}
          travelTime={travelTimesArray[index]}
          lastStop={index===dayRoute.activities.length-1}
        ></OneStopInDayRouteComponent>
      ))}
    </Paper>
  );
};

export default DayRouteComponent;
