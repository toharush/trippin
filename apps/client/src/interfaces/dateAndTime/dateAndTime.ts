import { Dayjs } from 'dayjs';

export interface DateAndTime {
    departureDate: Dayjs;
    returnDate: Dayjs;
    daytripStartTime: Dayjs;
    daytripEndTime: Dayjs;
 }