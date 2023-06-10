import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Destination } from "../../interfaces/destination/destination";

interface DestinationState extends Destination {}

const initialState: DestinationState = {
  name: '',
  cityCenter: {lat: 0, lng: 0}
};

const stores = createSlice({
  name: "destination",
  initialState: initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<Destination>) => ({
      ...state,
      name: action.payload.name,
      cityCenter: action.payload.cityCenter
    }),
    resetDestination: () => ({
      ...initialState
    }),
  },
});

export const { setDestination, resetDestination } = stores.actions;
export default stores.reducer;
