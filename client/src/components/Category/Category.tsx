import * as React from 'react';
import Box from '@mui/material/Box';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MuseumIcon from '@mui/icons-material/Museum';
import AttractionsIcon from '@mui/icons-material/Attractions';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ForestIcon from '@mui/icons-material/Forest';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import Slider from '@mui/material/Slider';
import { useStyles } from './CategoryStyle';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { JSXElement } from '@babel/types';
import { Stack } from '@mui/system';

interface props {
  name: string
}

interface MyObject {
  [key: string]: JSX.Element;
}

const iconMapping: MyObject = {
  'Museums': <MuseumIcon />,
  'Night Life': <NightlifeIcon />,
  'Resturants': <FastfoodIcon />,
  'Atractions': <AttractionsIcon />,
  'Shows &Concerts': <TheaterComedyIcon />,
  'Shopping': <LocalMallIcon />,
  'Sport': <SportsBasketballIcon />,
  'Nature': <ForestIcon />
};

export default function Category({name}:props) {

const classes = useStyles();

function valuetext(value: number) {
  return `${value}`;
}

const IconComponent = iconMapping[name];

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid xs={2} sm={1} md={2}>
          <Stack spacing={4}>
            <div className={classes.icon}>{IconComponent}</div>
            <text className={classes.text}>{name}</text>
          </Stack>
        </Grid>
        <Grid xs={8} sm={9} md={8}>
          <Slider
            aria-label="Temperature"
            defaultValue={5}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            sx={{
              color: '#86EAF0',
            }}
          />
        </Grid>
        </Grid> 
    </Box>
  );
}