import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStyles } from './SideBarStyle';
import TravelsCategoryComponent from '../TravelsCategoryComponent/TravelsCategoryComponent';
import SelectedActivitiesComponent from '../SelectedActivitiesComponent/SelectedActivitiesComponent';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

interface props {
  handleActivityClick: () => void;
}

export default function SideBar({handleActivityClick}:props) {
  
  const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.login}>
         <AccountCircleIcon className={classes.icon}></AccountCircleIcon>
         <text className={classes.text}>Login</text>
      </Box>
      <DateRangePicker/>
      <TravelsCategoryComponent></TravelsCategoryComponent>
      <SelectedActivitiesComponent handleActivityClick={handleActivityClick}></SelectedActivitiesComponent>
      <Box className={classes.logo}>
        <img src='logo.png' className={classes.img}></img>  
      </Box>
    </Box>
  );
}