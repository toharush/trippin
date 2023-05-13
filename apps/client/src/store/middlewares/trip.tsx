import { createAsyncThunk } from "@reduxjs/toolkit";
import { PermissionType } from "../../interfaces/permission/permission";
import ITrip from "../../interfaces/trip/trip";

const getTrips = () => [
  {
    id: 1,
    name: "New York",
    ownerId: "",
    permission: [
      {
        email: "test@gmail.com",
        type: PermissionType.viewer,
      },
    ],
    routes: [
      {
        day: 1,
        activities: [],
      },
    ],
  },
];

export const fetchTrips = createAsyncThunk(
  "trip/fetchTrips",
  async (props) => await getTrips()
);
