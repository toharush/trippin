import * as React from 'react';
import Box from '@mui/material/Box';
import { useStyles } from './TravelsCategoryComponentStyle';
import Dropdown from '../Dropdown/Dropdown';
import CategoriesGallery from '../CategoriesGallery/CategoriesGallery';
import { useState } from 'react';

export default function TravelsCategoryComponent() {

const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

const handleCategoriesClick = () => {
  setIsCategoriesOpen(!isCategoriesOpen);
}   

const classes = useStyles();
const categoriesTitle="Travel's Categories";

  return (
    <Box>
      <Dropdown handleClick={handleCategoriesClick} isCategoryOpen={isCategoriesOpen} title={categoriesTitle}></Dropdown>
      {isCategoriesOpen && <CategoriesGallery></CategoriesGallery> }
    </Box>
  );
}





