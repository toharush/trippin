import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as DatePickerMUI }from '@mui/x-date-pickers/DatePicker';
import '../DateRangePicker.css';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
    label: string;
    selectedDate: Dayjs;
    onDateChange: (date: Dayjs) => void;
    error?: boolean;
    errorMessage?: string;
}

export default function DatePicker({ label, selectedDate, onDateChange, error, errorMessage}: Props) {
    const [startDate, setStartDate] = useState<Dayjs>(selectedDate);
    const defaultDay = dayjs();

    const handleDateChange = (date: Dayjs) => {
        setStartDate(date);
        onDateChange(date);
    };

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerMUI
           className={`picker ${error ? 'error' : ''}`}
            label={label}
            value={startDate}
            onChange={(date) => {
                if (date) {
                    handleDateChange(date);
                }
            }}
            format="DD/MM/YYYY"
            defaultValue={defaultDay}
            disablePast
            slotProps={ error ? {
              textField: {
                helperText:errorMessage,
                className: 'error-message',
              },
              
            } : {}}
            />
        </LocalizationProvider>
    );
};