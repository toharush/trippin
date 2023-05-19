import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ITrip from "../../interfaces/trip/trip";
import { fetchTrips } from "../middlewares/trip";

interface TripState {
  trips: ITrip[];
  selectedTripId: number | null;
}

const initialState: TripState = {
  trips: [],
  selectedTripId: null,
};

const stores = createSlice({
  name: "trip",
  initialState: initialState,
  reducers: {
    setSelectedTrip: (state, action: PayloadAction<number>) => ({
      ...state,
      selectedTripId: action.payload,
    }),
  },
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

export const { setSelectedTrip } = stores.actions;
export default stores.reducer;
