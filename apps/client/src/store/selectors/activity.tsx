import { RootState } from "../store";

export const selectAllActivities = (state: RootState) => state.activity.activities;
export const selectSelectedActivities = (state: RootState) => state.activity.selectedActivities;

