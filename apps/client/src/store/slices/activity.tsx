import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../../interfaces";
import { fetchAllActivities, fetchNewCommentToServer } from "../middlewares";
import { filter, uniqBy } from "lodash";

interface ActivityState {
  activities: Activity[] | null;
  selectedActivities: Activity[];
  filters: {
    category: string | null;
  };
  loading: boolean;
  commentPending: boolean;
}

const initialState: ActivityState = {
  activities: null,
  selectedActivities: [],
  filters: {
    category: null,
  },
  loading: false,
  commentPending: false,
};

const stores = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    setSelectedActivities: (state, action: PayloadAction<Activity>) => {
      const selectedActivityIndex = state.selectedActivities.findIndex(
        (activity) => activity.id === action.payload.id
      );
      if (selectedActivityIndex === -1) {
        return {
          ...state,
          selectedActivities: [...state.selectedActivities, action.payload],
          activities: filter(
            state.activities,
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        return {
          ...state,
          selectedActivities: state.selectedActivities.filter(
            (activitiy, index) => index != selectedActivityIndex
          ),
          activities: [...state.activities!, action.payload],
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllActivities.fulfilled,
      (state, action: PayloadAction<Activity[]>) => ({
        ...state,
        activities: action.payload ? uniqBy(action.payload, "title") : [],
        loading: false,
      })
    );
    builder.addCase(fetchAllActivities.pending, (state, action) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(fetchAllActivities.rejected, (state, action) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(fetchNewCommentToServer.pending, (state, action) => ({
      ...state,
      commentPending: true,
    }));
    builder.addCase(fetchNewCommentToServer.rejected, (state, action) => ({
      ...state,
      commentPending: false,
    }));
    builder.addCase(fetchNewCommentToServer.fulfilled, (state, action) => ({
      ...state,
      commentPending: false,
    }));
  },
});

export const { setSelectedActivities, setCatehoryFilter } = stores.actions;
export default stores.reducer;
