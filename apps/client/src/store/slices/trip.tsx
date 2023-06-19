import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ITrip from "../../interfaces/activity/trip";
import { fetchCreateTripToServer } from "../middlewares/trip";
import { add } from "lodash";

interface TripState {
  trips: ITrip[] | null;
  selectedTripId: number | null;
  loading: boolean;
}

const initialState: TripState = {
  trips: [],
  selectedTripId: null,
  loading: false,
};

const tripsSlice = createSlice({
  name: "trip",
  initialState: initialState,
  reducers: {
    setTrips: (state, action: PayloadAction<ITrip[] | null>) => ({
      ...state,
      trips: action.payload,
    }),
    setSelectedTripId: (state, action: PayloadAction<number | null>) => ({
      ...state,
      selectedTripId: action.payload,
    }),
    resetSelectedTripId: (state) => ({
      ...state,
      selectedTripId: null,
    }),
    removeTrip: (state, action: PayloadAction<number>) => {
      const tripId = action.payload;
      const updatedTrips = state.trips?.filter((trip) => trip.id !== tripId);
      return {
        ...state,
        trips: updatedTrips || [],
      };
    },
    addTrip: (state, action: PayloadAction<ITrip>) => {
      const newTrip = action.payload;
      const updatedTrips = state.trips ? [...state.trips, newTrip] : [newTrip];
      return {
        ...state,
        trips: updatedTrips,
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateTripToServer.fulfilled, (state, action) => {
      const newTrip = action.payload;
      const updatedTrips = state.trips ? [...state.trips, newTrip] : [newTrip];
      return {
        ...state,
        selectedTripId: newTrip.id,
        trips: updatedTrips,
        loading: false,
      };
    });
    builder.addCase(fetchCreateTripToServer.pending, (state, action) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(fetchCreateTripToServer.rejected, (state, action) => ({
      ...state,
      loading: false,
    }));
  },
});

export const { setTrips, setSelectedTripId, resetSelectedTripId, removeTrip, addTrip } = tripsSlice.actions;
export default tripsSlice.reducer;