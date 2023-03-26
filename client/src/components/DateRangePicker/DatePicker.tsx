import React, { useState } from 'react';
import { useStyles } from './DatePickerStyle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as DatePickerMUI }from '@mui/x-date-pickers/DatePicker';


interface Props {
    label: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

export default function DatePicker({ label, selectedDate, onDateChange }: Props) {
    const [startDate, setStartDate] = useState<Date | null>(selectedDate);
    const classes = useStyles();


    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        onDateChange(date);
    };

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerMUI
            className={classes.root}
            label={label}
            value={startDate}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            defaultValue={new Date()}
            />
        </LocalizationProvider>
    );
};