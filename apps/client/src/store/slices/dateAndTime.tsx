import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DateAndTime } from "../../interfaces/dateAndTime/dateAndTime";
import dayjs from "dayjs";

interface DateAndTimeState {
    dateAndTime: DateAndTime;
    isDepartureDateValid: boolean;
    isReturnDateValid: boolean;
    isEndTimeValid: boolean;
}

const DAYJS_DAY = 'day';
const currentDate = dayjs();
const daytripStartTime = dayjs().hour(9).minute(0);
const daytripEndTime = dayjs().hour(20).minute(0);

const initialState: DateAndTimeState = {
    dateAndTime: {
        departureDate: currentDate,
        returnDate: currentDate.add(5, DAYJS_DAY),
        daytripStartTime: daytripStartTime,
        daytripEndTime: daytripEndTime,
    },
    isDepartureDateValid: true,
    isReturnDateValid: true,
    isEndTimeValid: true,
}

const stores = createSlice({
    name: "dateAndTime",
    initialState: initialState,
    reducers: {
        SetDateAndTime: (state, action: PayloadAction<DateAndTime>) => {
            const { departureDate, returnDate, daytripStartTime, daytripEndTime } = action.payload;
            const isDepartureDateValid = departureDate.isSame(currentDate.startOf(DAYJS_DAY)) ||
                departureDate.isAfter(currentDate.startOf(DAYJS_DAY));
            const isReturnDateValid = returnDate.startOf(DAYJS_DAY).isAfter(departureDate.startOf(DAYJS_DAY));
            const isEndTimeValid = daytripEndTime.isAfter(daytripStartTime);
            return {
                ...state,
                dateAndTime: action.payload,
                isDepartureDateValid,
                isReturnDateValid,
                isEndTimeValid,
            };
        },
    },
});

export const { SetDateAndTime } = stores.actions;
export default stores.reducer;