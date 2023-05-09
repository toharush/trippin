import { MarkerPoint } from "../../interfaces";
import { RootState } from "../store";

export const selectMarkerPoints = (state: RootState): MarkerPoint[] => state.map.markerPoints;
