import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStyles } from './SideBarStyle';
import TravelsCategoryComponent from '../TravelsCategoryComponent/TravelsCategoryComponent';
import SelectedActivitiesComponent from '../SelectedActivitiesComponent/SelectedActivitiesComponent';

export default function SideBar() {

const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.login}>
         <AccountCircleIcon className={classes.icon}></AccountCircleIcon>
         <text className={classes.text}>Login</text>
      </Box>
      <TravelsCategoryComponent></TravelsCategoryComponent>
      <SelectedActivitiesComponent></SelectedActivitiesComponent>
      <Box className={classes.logo}>
        <img src='logo.png' className={classes.img}></img>  
      </Box>
    </Box>
  );
}