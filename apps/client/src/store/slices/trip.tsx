import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../../interfaces";
import ITrip from "../../interfaces/activity/trip";
import { fetchCreateTripToServer } from "../middlewares/trip";

interface TripState {
  trip: ITrip | null;
  loading: boolean;
}

const initialState: TripState = {
  trip: null,
  loading: false,
};

const stores = createSlice({
  name: "trip",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCreateTripToServer.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.trip = action.payload.data.data.createTrip;
        state.loading = false;
      }
    );
    builder.addCase(fetchCreateTripToServer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateTripToServer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default stores.reducer;
