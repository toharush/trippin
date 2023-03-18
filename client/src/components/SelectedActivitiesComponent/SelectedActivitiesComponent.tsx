import * as React from 'react';
import Box from '@mui/material/Box';
import { useStyles } from './SelectedActivitiesComponentStyle';
import Dropdown from '../Dropdown/Dropdown';
import { useState } from 'react';
import ActivitiesGallery from '../ActivitiesGallery/ActivitiesGallery';

interface props {
    handleActivityClick: () => void;
}


export default function SelectedActivitiesComponent({handleActivityClick}:props) {

    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

    const handleActivitiesClick = () => {
        setIsActivitiesOpen(!isActivitiesOpen);
        handleActivityClick();
    }

    const classes = useStyles();
    const activitiesTitle = "Selected Activities";

    return (
        <Box>
            <Dropdown handleClick={handleActivitiesClick} isCategoryOpen={isActivitiesOpen} title={activitiesTitle}></Dropdown>
            {isActivitiesOpen && <ActivitiesGallery></ActivitiesGallery>}
        </Box>
    );
}