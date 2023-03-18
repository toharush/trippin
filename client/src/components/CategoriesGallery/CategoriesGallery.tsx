import * as React from 'react';
import Box from '@mui/material/Box';
import Category from '../Category/Category';
import NightlifeIcon from '@mui/icons-material/Nightlife';
//import { useStyles } from './DropdownStyle';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Stack } from '@mui/system';

export default function CategoriesGallery() {

// const classes = useStyles();

const categories=["Museums","Night Life","Resturants","Atractions","Shows &Concerts","Shopping","Sport","Nature"];

  return (
    <Stack spacing={{ xs: 1, sm: 1, md: 5}}>
       <Grid container spacing={3}>
         {categories.map((category) => (<Grid xs={8} sm={8} md={6} ><Category name={category}></Category></Grid>))}
        </Grid>
    </Stack>
  );
}