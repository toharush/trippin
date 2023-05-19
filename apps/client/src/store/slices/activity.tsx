import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../../interfaces/activity/activity";
import { fetchAllActivities } from "../middlewares";

interface ActivityState {
  activities: Activity[] | null;
  selectedActivities: Activity[];
  filters: {
    category: string | null;
  };
  loading: boolean;
}

const initialState: ActivityState = {
  activities: null,
  selectedActivities: [],
  filters: {
    category: null,
  },
  loading: false,
};

const stores = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    setSelectedActivities: (state, action: PayloadAction<Activity>) => {
      let selectedActivitis: Activity[] = [];
      const selectedActivityIndex = state.selectedActivities.findIndex(
        (activity) => activity.id === action.payload.id
      );
      if (selectedActivityIndex === -1) {
        return {
          ...state,
          activities: state.activities!.filter(
            (item) => item.id !== action.payload.id
          ),
          selectedActivities: [...state.selectedActivities, action.payload],
        };
      } else {
        return {
          ...state,
          activities: [...state.activities!, action.payload],
          selectedActivities: state.selectedActivities.splice(
            selectedActivityIndex,
            1
          ),
        };
      }
    },
    setCatehoryFilter: (state, action: PayloadAction<string | null>) => ({
      ...state,
      filters: {
        ...state.filters,
        category: action.payload,
      },
    }),
    removeAllSelectedActivities: (state, action) => ({
      ...state,
      selectedActivities: [],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllActivities.fulfilled,
      (state, action: PayloadAction<null | Activity[]>) => {
        state.activities = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchAllActivities.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllActivities.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {
  setSelectedActivities,
  setCatehoryFilter,
  removeAllSelectedActivities,
} = stores.actions;
export default stores.reducer;
