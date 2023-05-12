import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './HourPicker.css';

interface Props {
  label: string;
  selectedTime: Date | null;
  onTimeChange: (time: Date | null) => void;
}

export default function HourPicker({ label, selectedTime, onTimeChange }: Props) {
  const [time, setTime] = useState<Date | null>(selectedTime);

  const handleTimeChange = (time: Date | null) => {
    setTime(time);
    onTimeChange(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        className="picker"
        label={label}
        value={time}
        onChange={handleTimeChange}
        ampm={false}
      />
    </LocalizationProvider>
  );
}