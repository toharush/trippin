import { RootState } from "../store";

export const selectAllTripsOfCurrentUser = (state: RootState) => state.trip.trips;
export const selectSelectedTrip = (state: RootState) => state.trip.selectedTrip;