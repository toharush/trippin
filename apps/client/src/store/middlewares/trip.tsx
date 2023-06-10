import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCreateTrip } from "../../services";
import ICoordinate from "../../interfaces/activity/coordinate";
import IClientCategory from "../../interfaces/activity/clientCategory";
import { Activity } from "../../interfaces";

export const fetchCreateTripToServer = createAsyncThunk(
  "trip/newTrip",
  async (props: {
    user_id: string | null;
    name: string;
    cityName: string;
    cityCenter: ICoordinate;
    radius: number;
    categoryPriorities: IClientCategory[];
    selectedActivities: Activity[];
    startDate: number;
    endDate: number;
    startHour: number;
    endHour: number;
  }) => {
    return await fetchCreateTrip(
      props.user_id,
      props.name,
      props.cityName,
      props.cityCenter,
      props.radius,
      props.categoryPriorities,
      props.selectedActivities.map(item => item.id),
      props.startDate,
      props.endDate,
      props.startHour,
      props.endHour
    );
  }
);
