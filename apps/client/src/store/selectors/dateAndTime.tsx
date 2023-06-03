import { DateAndTime } from "../../interfaces/dateAndTime/dateAndTime";
import { RootState } from "../store";

export const selectDateAndTime = (state: RootState): DateAndTime => state.dateAndTime.dateAndTime;