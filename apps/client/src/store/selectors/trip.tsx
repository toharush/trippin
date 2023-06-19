import { RootState } from "../store";

export const selectAllTripsOfCurrentUser = (state: RootState) => state.trip.trips;
export const selectSelectedTrip = (state: RootState) => {
    const selectedTripId = state.trip.selectedTripId;
    const selectedTrip = state.trip.trips?.find(trip => trip.id === selectedTripId);
    return selectedTrip;
}
export const selectTripLoading = (state: RootState) => state.trip.loading;
