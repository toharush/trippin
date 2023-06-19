import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ITrip from "../../interfaces/activity/trip";

interface TripState {
    trips: ITrip[] | null;
    selectedTrip: ITrip | null;
}

const initialState: TripState = {
    trips: [],
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
        removeTrip: (state, action: PayloadAction<number>) => {
            const tripId = action.payload;
            const updatedTrips = state.trips?.filter((trip) => trip.id !== tripId);
            return {
                ...state,
                trips: updatedTrips || [],
            };
        },
        addTrip: (state, action: PayloadAction<ITrip>) => {
            const newTrip = action.payload;
            const updatedTrips = state.trips ? [...state.trips, newTrip] : [newTrip];
            return {
                ...state,
                trips: updatedTrips,
            };
        }
    }
});

export const { setTrips, setSelectedTrip, resetSelectedTrip, removeTrip, addTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
