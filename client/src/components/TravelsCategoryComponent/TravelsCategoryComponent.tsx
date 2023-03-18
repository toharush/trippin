import * as React from 'react';
import Box from '@mui/material/Box';
import { useStyles } from './TravelsCategoryComponentStyle';
import Dropdown from '../Dropdown/Dropdown';
import CategoriesGallery from '../CategoriesGallery/CategoriesGallery';
import { useState } from 'react';
import ActivitiesGallery from '../ActivitiesGallery/ActivitiesGallery';


export default function TravelsCategoryComponent() {

const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

const handleCategoriesClick = () => {
  setIsCategoriesOpen(!isCategoriesOpen);
}   

const handleActivitiesClick = () => {
  setIsActivitiesOpen(!isActivitiesOpen);
}

const classes = useStyles();
const categoriesTitle="Travel's Categories";
const activitiesTitle="Selected Activities";

  return (
    <Box>
      <Dropdown handleClick={handleCategoriesClick} isCategoryOpen={isCategoriesOpen} title={categoriesTitle}></Dropdown>
      {isCategoriesOpen && <CategoriesGallery></CategoriesGallery> }
      <Dropdown handleClick={handleActivitiesClick} isCategoryOpen={isActivitiesOpen} title={activitiesTitle}></Dropdown>
        {isActivitiesOpen && <ActivitiesGallery></ActivitiesGallery>}
    </Box>
  );
}





