import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteTripById,
  fetchAllTripsByUserId,
  fetchCreateTrip,
} from "../../services";
import ICoordinate from "../../interfaces/activity/coordinate";
import IClientCategory from "../../interfaces/activity/clientCategory";
import { Activity } from "../../interfaces";
import ITrip from "../../interfaces/activity/trip";

export const fetchCreateTripToServer = createAsyncThunk(
  "trip/newTrip",
  async (props: {
    user_id: string | null;
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
      props.cityName,
      props.cityCenter,
      props.radius,
      props.categoryPriorities,
      props.selectedActivities.map((item) => item.id),
      props.startDate,
      props.endDate,
      props.startHour,
      props.endHour
    );
  }
);

export const getAllTripsByUserId = createAsyncThunk<
  ITrip[],
  { user_id: string | null }
>(
  "trips/fetchByUserId",
  async (props: { user_id: string | null }) =>
    await fetchAllTripsByUserId(props.user_id)
);

export const deleteTrip = createAsyncThunk(
  "trip/deleteTrip",
  async (props: { trip_id: number }) => {
    return await deleteTripById(props.trip_id);
  }
);
