import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../interfaces";

interface MapState {
  selectedActivitiesMarkerPoints: MarkerPoint[];
  // routesMarkerPoints 
  flyTo: {
    latlng: [number, number];
    zoom: number;
  };
  loading: boolean;
}

const initialState: MapState = {
  selectedActivitiesMarkerPoints: [],
  flyTo: {
    latlng: [56.6, 56.8],
    zoom: 4,
  },
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
    },
    SetFlyTo: (
      state,
      action: PayloadAction<{
        latlng: [number, number];
        zoom: number;
      }>
    ) => ({ ...state, flyTo: action.payload }),
  },
});

export const {  AddMarkerPointToSelectedActivities,
                RemoveMarkerPointFromSelectedActivities,  
                SetFlyTo }
                 = stores.actions;
export default stores.reducer;
