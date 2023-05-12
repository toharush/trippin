import { RootState } from "../store";

export const selectActivitiesMarkerPoints = (state: RootState) => state.map.selectedActivitiesMarkerPoints;