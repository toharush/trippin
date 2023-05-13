import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ITrip from "../../interfaces/trip/trip";
import { fetchTrips } from "../middlewares/trip";

interface TripState {
  trips: ITrip[];
  selectedTripId: string | null;
}

const initialState: TripState = {
  trips: [],
  selectedTripId: null,
};

const stores = createSlice({
  name: "trip",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTrips.fulfilled,
      (state, action: PayloadAction<ITrip[]>) => ({
        ...state,
        trips: action.payload,
      })
    );
  },
});

export const {} = stores.actions;
export default stores.reducer;
