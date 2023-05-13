import { Dayjs } from 'dayjs';

export interface DateAndTime {
    departureDate: Dayjs;
    returnDate: Dayjs;
    departureTime: Dayjs;
    returnTime: Dayjs;
 }