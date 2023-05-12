import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DatePicker from './DatePicker';
import Typography from '@mui/material/Typography';
import HourPicker from '../HourPicker/HourPicker';

export default function DateRangePicker() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
    };

    const handleTimeChange = (date: Date | null) => {
        setSelectedTime(date);
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
                selectedDate={selectedDate}
                onDateChange={handleDateChange}/>
            
          </Grid>
          
          <Grid xs={5} sx={{ marginLeft: ' 5%'}}>
            <DatePicker
                    label='Return date'
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}/>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: '5%'}}>
            <Grid xs={5}>
                <HourPicker
                    label='Departure time'
                    selectedTime={selectedTime}
                    onTimeChange={handleTimeChange}/>
            </Grid>
            <Grid xs={5} sx={{ marginLeft: ' 5%'}}>
                <HourPicker
                label='Return time'
                selectedTime={selectedTime}
                onTimeChange={handleTimeChange}/>
            </Grid>
        </Grid>
      </Box>
    );
};