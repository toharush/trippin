import { RootState } from "../store";

export const selectTrips = (state: RootState) => state.trip.trips;
export const selectSelectedTriptId = (state: RootState) =>
  state.trip.selectedTripId;

export const selectSelectedTript = (state: RootState) =>
  state.trip.trips.filter((trip) => trip.id === state.trip.selectedTripId)[0];
