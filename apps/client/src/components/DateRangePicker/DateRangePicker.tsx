import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DatePicker from './DatePicker/DatePicker';
import Typography from '@mui/material/Typography';
import HourPicker from './HourPicker/HourPicker';
import useDateAndTime from '../../hooks/useDateAndTime';
import { Dayjs } from 'dayjs';
import { DateValidationError } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';
import { selectIsDepartureDateValid, selectIsEndTimeValid, selectIsReturnDateValid } from '../../store/selectors/dateAndTime';

export default function DateRangePicker() {
  const { dateAndTime, setDateAndTime, getDurationInDays } = useDateAndTime();
  const isDepartureDateValid = useSelector(selectIsDepartureDateValid);
  const isReturnDateValid = useSelector(selectIsReturnDateValid);
  const isEndTimeValid = useSelector(selectIsEndTimeValid);

  const departureDateInvalidMessage = 'Must be today or after'
  const returnDateInvalidMessage = 'Must be after departure date'
  const endTimeInvalidMessage = 'Must end after daytrip begins'

  const handleDepartureDateChange = (date: Dayjs) => {
    setDateAndTime({ ...dateAndTime, departureDate: date });
  };

  const handleReturnDateChange = (date: Dayjs) => {
    setDateAndTime({ ...dateAndTime, returnDate: date });
  };

  const handleDaytripStartTimeChange = (date: Dayjs) => {
    setDateAndTime({ ...dateAndTime, daytripStartTime: date });
  };

  const handleDaytripEndTimeChange = (date: Dayjs) => {
    setDateAndTime({ ...dateAndTime, daytripEndTime: date });
  };

  const handleInvalidDate = (error: DateValidationError, value: Dayjs | null) => {
   
  };

  return (
    <Box sx={{ flexGrow: 1, marginLeft: '5%', color: 'white', marginBottom: '5%' }}>
      <Typography gutterBottom sx={{ color: 'var(--primary-color)' }}>
        When are you going?
      </Typography>
      <Grid container sx={{ marginTop: '5%' }}>
        <Grid xs={5}>
          <DatePicker
            label='Departure date'
            selectedDate={dateAndTime.departureDate}
            onDateChange={handleDepartureDateChange}
            error={!isDepartureDateValid}
            errorMessage={departureDateInvalidMessage} />

        </Grid>

        <Grid xs={5} sx={{ marginLeft: ' 5%' }}>
          <DatePicker
            label='Return date'
            selectedDate={dateAndTime.returnDate}
            onDateChange={handleReturnDateChange}
            error={!isReturnDateValid}
            errorMessage={returnDateInvalidMessage} />
        </Grid>
      </Grid>
      <Typography gutterBottom sx={{ color: 'var(--primary-color)', marginTop: '5%' }}>
        Daytrip hour range
      </Typography>
      <Grid container sx={{ marginTop: '5%' }}>
        <Grid xs={5}>
          <HourPicker
            label='Begin'
            selectedTime={dateAndTime.daytripStartTime}
            onTimeChange={handleDaytripStartTimeChange} />
        </Grid>
        <Grid xs={5} sx={{ marginLeft: ' 5%' }}>
          <HourPicker
            label='End'
            selectedTime={dateAndTime.daytripEndTime}
            onTimeChange={handleDaytripEndTimeChange}
            error={!isEndTimeValid}
            errorMessage={endTimeInvalidMessage} />
        </Grid>
      </Grid>
    </Box>
  );
};
