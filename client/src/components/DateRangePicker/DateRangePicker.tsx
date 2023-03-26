import { useState } from 'react';
import { useStyles } from './DatePickerStyle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DatePicker from './DatePicker';
import Typography from '@mui/material/Typography';

export default function DateRangePicker() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const classes = useStyles();
    
    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
    };

    return(
    <Box sx={{ flexGrow: 1 , marginLeft: '5%' , color: 'white'}}>
        <Typography gutterBottom>
        Date Range
        </Typography>
        <Grid container sx={{ marginTop: '5%'}}>
          <Grid xs={5}>
          <DatePicker 
                label='Start Date'
                selectedDate={selectedDate}
                onDateChange={handleDateChange}/>
          </Grid>
          <Grid xs={5} sx={{ marginLeft: ' 5%'}}>
          <DatePicker
                label='End Date'
                selectedDate={selectedDate}
                onDateChange={handleDateChange}/>
          </Grid>
          </Grid>
      </Box>
    );
};
