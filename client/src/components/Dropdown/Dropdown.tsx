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
    title:string;
}

export default function Dropdown({handleClick,isCategoryOpen,title}:props) {

const classes = useStyles();

return (
<Box className={classes.root} onClick={handleClick}>
    {
        !isCategoryOpen && <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
    } 
    {   
        isCategoryOpen && 
        <KeyboardArrowDownIcon></KeyboardArrowDownIcon>     
    }       
    <text className={classes.title}>{title}</text>
</Box>

);
}