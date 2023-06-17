import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ITrip from "../../interfaces/activity/trip";

interface TripState {
    trips: ITrip[] | null;
    selectedTrip: ITrip | null;
}

const initialState: TripState = {
    trips: null,
    selectedTrip: null,
};


const tripsSlice = createSlice({
    name: "trip",
    initialState: initialState,
    reducers: {
        setTrips: (state, action: PayloadAction<ITrip[] | null>) => ({
            ...state,
            trips: action.payload,
        }),
        setSelectedTrip: (state, action: PayloadAction<ITrip | null>) => ({
            ...state,
            selectedTrip: action.payload,
        }),
        resetSelectedTrip: (state) => ({
            ...state,
            selectedTrip: null,
        }),
    }
});

export const { setTrips, setSelectedTrip, resetSelectedTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
