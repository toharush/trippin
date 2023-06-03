import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as DatePickerMUI }from '@mui/x-date-pickers/DatePicker';
import './DatePicker.css';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
    label: string;
    selectedDate: Dayjs;
    onDateChange: (date: Dayjs) => void;
}

export default function DatePicker({ label, selectedDate, onDateChange }: Props) {
    const [startDate, setStartDate] = useState<Dayjs>(selectedDate);

    const handleDateChange = (date: Dayjs) => {
        setStartDate(date);
        onDateChange(date);
    };

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerMUI
            className="date-picker"
            label={label}
            value={startDate}
            onChange={(date) => {
                if (date) {
                    handleDateChange(date);
                }
            }}
            format="DD/MM/YYYY"
            defaultValue={dayjs()}
            />
        </LocalizationProvider>
    );
};