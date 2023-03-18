import * as React from 'react';
import Box from '@mui/material/Box';
import Category from '../Category/Category';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import { useStyles } from './ActivitiesSidebarComponentStyle';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Stack } from '@mui/system';
import { useState } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';

export default function ActivitiesSidebarComponent() {

const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
        <SearchComponent title='Search for activities'></SearchComponent>      
    </Box>
  );
}

