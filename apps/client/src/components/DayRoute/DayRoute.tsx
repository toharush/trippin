import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { DayRoute } from '../../interfaces/dayRoute/dayRoute';
import OneStopComponent from '../OneStopComponent/OneStopComponent';
import { spacing, Stack } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface props {
    dayRoute: DayRoute,
}

 const DayRouteComponent =({dayRoute}: props)=> {
  
  return (
    <Stack sx={{ maxWidth: 400, margin:"8%"}} spacing={1}>
      <LocationOnIcon sx={{color:"#86eaf0"}}></LocationOnIcon>
      {dayRoute.route.map((activity)=> <OneStopComponent activity={activity}></OneStopComponent>)}
    </Stack>
  );
}

export default DayRouteComponent;