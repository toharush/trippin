import * as React from 'react';
import Box from '@mui/material/Box';
import { useStyles } from './DropdownStyle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import CategoriesGallery from '../CategoriesGallery/CategoriesGallery';

interface props {
    handleClick: () => void;
    isCategoryOpen: boolean;
}

export default function Dropdown({handleClick,isCategoryOpen}:props) {

const classes = useStyles();

return (
<Box className={classes.root}>
    {
        !isCategoryOpen && <KeyboardArrowRightIcon onClick={handleClick}></KeyboardArrowRightIcon>
    } 
    {   isCategoryOpen && 
        <KeyboardArrowDownIcon onClick={handleClick}></KeyboardArrowDownIcon>     
    }       
    <text className={classes.title}>Travel's Categories</text>
</Box>

);
}