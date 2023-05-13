import { RootState } from "../store";

export const selectTrips = (state: RootState) => state.trip.trips;
