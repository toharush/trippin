import { RootState } from "../store";

export const selectTrip = (state: RootState) => state.trip.trip;
export const selectTripLoading = (state: RootState) => state.trip.loading;
