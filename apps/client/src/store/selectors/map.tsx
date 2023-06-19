import { MarkerPoint } from "../../interfaces";
import { RootState } from "../store";

export const selectActivitiesMarkerPoints = (state: RootState) => state.map.selectedActivitiesMarkerPoints;
export const selectFlyTo = (state: RootState) => state.map.flyTo;
export const selectRoutesMarkerPoints = (state: RootState) => state.map.routesMarkerPoints
