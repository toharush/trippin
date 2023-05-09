import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../interfaces";

interface MapState {
  markerPoints: MarkerPoint[];
  flyTo: {
    latlng: [number, number];
    zoom: number;
  };
  loading: boolean;
}

const initialState: MapState = {
  markerPoints: [],
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
    AddMarkerPoint: (state, action: PayloadAction<MarkerPoint>) => ({
      ...state,
      markerPoints: [...state.markerPoints, action.payload],
    }),
    RemoveMarkerPoint: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        markerPoints: state.markerPoints.filter(
          (markerPoint) => markerPoint.id !== action.payload
        ),
      };
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

export const { AddMarkerPoint, RemoveMarkerPoint, SetFlyTo } = stores.actions;
export default stores.reducer;
