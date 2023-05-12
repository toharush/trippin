import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../interfaces";

interface MapState {
  selectedActivitiesMarkerPoints: MarkerPoint[];
  // routesMarkerPoints 
  loading: boolean;
}

const initialState: MapState = {
  selectedActivitiesMarkerPoints: [],
  loading: false,
};

const stores = createSlice({
  name: "map",
  initialState: initialState,
  reducers: {
    AddMarkerPointToSelectedActivities: (state, action: PayloadAction<MarkerPoint>) => ({
      ...state,
      selectedActivitiesMarkerPoints: [...state.selectedActivitiesMarkerPoints, action.payload],
    }),
    RemoveMarkerPointFromSelectedActivities: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedActivitiesMarkerPoints: state.selectedActivitiesMarkerPoints.filter(
          (selectedActivitieMarkerPoint) => selectedActivitieMarkerPoint.id !== action.payload
        ),
      };
    },
    HideAllSelectedActivitiesMarkers: (state) => {
      return {
        ...state,
        selectedActivitiesMarkerPoints: state.selectedActivitiesMarkerPoints.map(
          (samp) => {
            return {...samp, show: false};
          })
      }
    }
  },
});

export const { AddMarkerPointToSelectedActivities, 
               RemoveMarkerPointFromSelectedActivities} = stores.actions;
export default stores.reducer;
