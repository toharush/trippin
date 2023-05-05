import { RootState } from "../store";

export const selectMarkerPoints = (state: RootState) => state.map.markerPoints;