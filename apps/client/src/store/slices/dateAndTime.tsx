import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DateAndTime } from "../../interfaces/dateAndTime/dateAndTime";
import dayjs from "dayjs";

interface DateAndTimeState { 
    dateAndTime: DateAndTime;
}

const initialState: DateAndTimeState = {
    dateAndTime: {
        departureDate: dayjs(),
        departureTime: dayjs(),
        returnDate: dayjs(),
        returnTime: dayjs(),
    }
}

const stores = createSlice({
    name: "dateAndTime",
    initialState: initialState,
    reducers: {
        SetDateAndTime: (state, action: PayloadAction<DateAndTime>) => ({
            ...state,
            dateAndTime: action.payload }),
    },
});

export const { SetDateAndTime } = stores.actions;
export default stores.reducer;