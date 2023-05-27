import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "../../../../../interfaces";
import { fetchAllActivities, fetchNewCommentToServer } from "../middlewares";

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
        state.selectedActivities = [
          ...state.selectedActivities,
          action.payload,
        ];
        state.activities = state.activities!.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.selectedActivities.splice(selectedActivityIndex, 1);
        state.activities = [...state.activities!, action.payload];
      }
    },
    setCatehoryFilter: (state, action: PayloadAction<string | null>) => ({
      ...state,
      filters: {
        ...state.filters,
        category: action.payload
      }
    })
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
    builder.addCase(fetchNewCommentToServer.pending, (state, action) => {
      state.commentPending = true;
    });
    builder.addCase(fetchNewCommentToServer.rejected, (state, action) => {
      state.commentPending = false;
    });
  },
});

export const { setSelectedActivities, setCatehoryFilter } = stores.actions;
export default stores.reducer;
