import * as React from 'react';
import Box from '@mui/material/Box';
import { useStyles } from './TravelsCategoryComponentStyle';
import Dropdown from '../Dropdown/Dropdown';
import CategoriesGallery from '../CategoriesGallery/CategoriesGallery';
import { useState } from 'react';


export default function TravelsCategoryComponent() {

const [isCategoryOpen, setIsCategoryOpen] = useState(false);

const handleClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
}    

const classes = useStyles();

  return (
    <Box>
        <Dropdown handleClick={handleClick} isCategoryOpen={isCategoryOpen}></Dropdown>
        { isCategoryOpen && <CategoriesGallery></CategoriesGallery> }
    </Box>
  );
}





