import { DateAndTime } from "../../interfaces/dateAndTime/dateAndTime";
import { RootState } from "../store";

export const selectDateAndTime = (state: RootState): DateAndTime => state.dateAndTime.dateAndTime;
export const selectIsDepartureDateValid = (state: RootState): boolean => state.dateAndTime.isDepartureDateValid;
export const selectIsReturnDateValid = (state: RootState): boolean => state.dateAndTime.isReturnDateValid;
export const selectIsEndTimeValid = (state: RootState): boolean => state.dateAndTime.isEndTimeValid;
export const selectIsDateAndTimeValid = (state: RootState): boolean => selectIsDepartureDateValid(state) &&
    selectIsReturnDateValid(state) &&
    selectIsEndTimeValid(state);