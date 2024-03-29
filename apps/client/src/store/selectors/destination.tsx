import ICoordinate from "../../interfaces/activity/coordinate";
import { Destination } from "../../interfaces/destination/destination";
import { RootState } from "../store";

export const selectDestination = (state: RootState): Destination =>
  state.destination;

export const selectDestinationName = (state: RootState): string =>
  state.destination.name;

export const selectDestinationCityCenter = (state: RootState): ICoordinate =>
  state.destination.cityCenter;

export const selectIsDestinationValid = (state: RootState): boolean => selectDestinationName(state) !== '' &&
  selectDestinationCityCenter(state).lat !== 0 && selectDestinationCityCenter(state).lng !== 0;