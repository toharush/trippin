import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../../interfaces";
import { fetchAllActivities } from "../middlewares";

interface ActivityState {
  activities: Activity[] | null;
  selectedActivities: Activity[];
  loading: boolean;
}

const initialState: ActivityState = {
  activities: null,
  selectedActivities: [],
  loading: false,
};

const stores = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    setSelectedActivities: (state, action: PayloadAction<Activity[]>) => {
      state.selectedActivities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllActivities.fulfilled,
      (state, action: PayloadAction<null | Activity[]>) => {
        state.activities = action.payload;
        state.loading = false;
      }
    );
  },
});

export const { setSelectedActivities } = stores.actions;
export default stores.reducer;
