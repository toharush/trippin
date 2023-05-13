import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DateAndTime } from "../../interfaces/dateAndTime/dateAndTime";
import dayjs from "dayjs";

interface DateAndTimeState { 
    dateAndTime: DateAndTime;
}

const daytripStartTime = dayjs().hour(9).minute(0);
const daytripEndTime = dayjs().hour(23).minute(0);

const initialState: DateAndTimeState = {
    dateAndTime: {
        departureDate: dayjs(),
        returnDate: dayjs().add(5, 'day'),
        daytripStartTime: daytripStartTime,
        daytripEndTime: daytripEndTime,
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