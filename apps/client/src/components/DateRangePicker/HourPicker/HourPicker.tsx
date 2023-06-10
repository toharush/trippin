import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import '../DateRangePicker.css';
import dayjs, { Dayjs } from "dayjs";

interface Props {
  label: string;
  selectedTime: Dayjs;
  onTimeChange: (time: Dayjs) => void;
  error?: boolean;
  errorMessage?: string;
}

export default function HourPicker({ label, selectedTime, onTimeChange, error, errorMessage }: Props) {
  const defaultDay = dayjs();
  const [time, setTime] = useState<Dayjs>(selectedTime);

  const handleTimeChange = (time: Dayjs) => {
    setTime(time);
    onTimeChange(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        className={`picker ${error ? 'error' : ''}`}
        label={label}
        value={time}
        onChange={(date: Dayjs | null) => {
          if (date) {
            handleTimeChange(date);
          }
        }}
        ampm={false}
        defaultValue={defaultDay}
        slotProps={error ? {
          textField: {
            helperText: errorMessage,
            className: 'error-message',
          },
        } : {}}
      />
    </LocalizationProvider>
  );
}