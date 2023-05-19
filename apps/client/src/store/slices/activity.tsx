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
    removeStoreSelectedActivity: (state, action: PayloadAction<Activity>) => ({
      ...state,
      selectedActivities: state.selectedActivities.filter(
        (selectedAct) => selectedAct.id != action.payload.id
      ),
      activities: [...state.activities!, action.payload],
    }),
    addStoreSelectedActivity: (state, action: PayloadAction<Activity>) => {
      if (
        state.selectedActivities.find((act) => act.id === action.payload.id)
      ) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          selectedActivities: [...state.selectedActivities, action.payload],
          activities: state.activities!.filter(
            (act) => act.id != action.payload.id
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
  setCatehoryFilter,
  removeStoreSelectedActivity,
  addStoreSelectedActivity,
  removeAllSelectedActivities,
} = stores.actions;
export default stores.reducer;
