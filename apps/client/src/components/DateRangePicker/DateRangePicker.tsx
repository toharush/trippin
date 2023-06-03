import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DatePicker from './DatePicker';
import Typography from '@mui/material/Typography';
import HourPicker from '../HourPicker/HourPicker';
import useDateAndTime from '../../hooks/useDateAndTime';
import { Dayjs } from 'dayjs';

export default function DateRangePicker() {

    const { dateAndTime, setDateAndTime, getDurationInDays } = useDateAndTime();
    
    const handleDepartureDateChange = (date: Dayjs) => {
      setDateAndTime({ ...dateAndTime, departureDate: date});
    };

    const handleReturnDateChange = (date: Dayjs) => {
      setDateAndTime({ ...dateAndTime, returnDate: date});
    };

    const handleDaytripStartTimeChange = (date: Dayjs) => {
      setDateAndTime({ ...dateAndTime, daytripStartTime: date});
      };

      const handleDaytripEndTimeChange = (date: Dayjs) => {
        setDateAndTime({ ...dateAndTime, daytripEndTime: date});
      };

    return(
    <Box sx={{ flexGrow: 1 , marginLeft: '5%' , color: 'white' , marginBottom: '5%'}}>
        <Typography gutterBottom sx= {{ color: 'var(--primary-color)' }}>
        When are you going?
        </Typography>
        <Grid container sx={{ marginTop: '5%'}}>
          <Grid xs={5}>
          <DatePicker 
                label='Departure date'
                selectedDate={dateAndTime.departureDate}
                onDateChange={handleDepartureDateChange}/>
            
          </Grid>
          
          <Grid xs={5} sx={{ marginLeft: ' 5%'}}>
            <DatePicker
                    label='Return date'
                    selectedDate={dateAndTime.returnDate}
                    onDateChange={handleReturnDateChange}/>
          </Grid>
        </Grid>
        <Typography gutterBottom sx= {{ color: 'var(--primary-color)', marginTop: '5%' }}>
        Daytrip hour range
        </Typography>
        <Grid container sx={{ marginTop: '5%'}}>
            <Grid xs={5}>
                <HourPicker
                    label='Begin'
                    selectedTime={dateAndTime.daytripStartTime}
                    onTimeChange={handleDaytripStartTimeChange}/>
            </Grid>
            <Grid xs={5} sx={{ marginLeft: ' 5%'}}>
                <HourPicker
                  label='End'
                  selectedTime={dateAndTime.daytripEndTime}
                  onTimeChange={handleDaytripEndTimeChange}/>
            </Grid>
        </Grid>
      </Box>
    );
};