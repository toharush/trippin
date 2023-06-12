import { RootState } from "../store";

export const selectTrip = (state: RootState) =>
  state.trip.trip;