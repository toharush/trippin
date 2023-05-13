import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './HourPicker.css';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  label: string;
  selectedTime: Dayjs;
  onTimeChange: (time: Dayjs) => void;
}

export default function HourPicker({ label, selectedTime, onTimeChange }: Props) {
  const adapter = new AdapterDayjs();
  const [time, setTime] = useState<Dayjs>(selectedTime);

  const handleTimeChange = (time: Dayjs) => {
    setTime(time);
    onTimeChange(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        className="picker"
        label={label}
        value={time}
        onChange={(date) => {
          if (date) {
            handleTimeChange(date);
          }
        }}
        ampm={false}
        defaultValue={dayjs()}
      />
    </LocalizationProvider>
  );
}