import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../../../../interfaces/markerPoint";

interface MapState {
    markerPoints: MarkerPoint[],
    loading: boolean;
}

const initialState: MapState = {
    markerPoints: [],
    loading: false,
};

const stores = createSlice({
    name: "map",
    initialState: initialState,
    reducers: {
        AddMarkerPoint: (state, action: PayloadAction<MarkerPoint>) => 
            ({ ...state, markerPoints: [...state.markerPoints, action.payload] }),
        RemoveMarkerPoint: (state, action: PayloadAction<string>) => 
            {
                return {...state, markerPoints:state.markerPoints.filter(markerPoint => markerPoint.id != action.payload)};
            }
    }


});

export const { AddMarkerPoint, RemoveMarkerPoint } = stores.actions;
export default stores.reducer;