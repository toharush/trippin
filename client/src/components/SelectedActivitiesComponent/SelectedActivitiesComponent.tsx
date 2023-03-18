import * as React from 'react';
import Box from '@mui/material/Box';
import { useStyles } from './SelectedActivitiesComponentStyle';
import Dropdown from '../Dropdown/Dropdown';
import { useState } from 'react';
import ActivitiesGallery from '../ActivitiesGallery/ActivitiesGallery';


export default function SelectedActivitiesComponent() {

    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

    const handleActivitiesClick = () => {
        setIsActivitiesOpen(!isActivitiesOpen);
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