import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../interfaces";
import { act } from "@testing-library/react";

interface MapState {
  selectedActivitiesMarkerPoints: MarkerPoint[];
  routesMarkerPoints: MarkerPoint[];
  flyTo: {
    latlng: [number, number];
    zoom: number;
  };
  loading: boolean;
}

const initialState: MapState = {
  selectedActivitiesMarkerPoints: [],
  routesMarkerPoints:[],
  flyTo: {
    latlng: [51.92949138694931, -2.0648223468551428],
    zoom: 6,
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
    SetMarkerPointsOfRoute: (state, action: PayloadAction<MarkerPoint[]>) => ({
      ...state,
      routesMarkerPoints: action.payload,
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
                SetMarkerPointsOfRoute, 
                SetFlyTo }
                 = stores.actions;
export default stores.reducer;
