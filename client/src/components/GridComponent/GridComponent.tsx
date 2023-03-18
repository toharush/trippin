import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import SideBar from '../SideBar/SideBar';
import Map from '../Map/Map';
import ActivitiesSidebarComponent from '../ActivitiesSidebarComponent/ActivitiesSidebarComponent';
import { useState } from 'react';

export default function GridComponent() {

const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

const handleClick = () => {
  setIsActivitiesOpen(!isActivitiesOpen);
}

    return (
      <Box sx={{ flexGrow:1 }}>
        <Grid container>
          <Grid xs={4}>
            <SideBar handleActivityClick={handleClick}></SideBar>
          </Grid>
          { isActivitiesOpen &&
            <Grid xs={3}>
              <ActivitiesSidebarComponent></ActivitiesSidebarComponent>
            </Grid>
          }
          <Grid xs={isActivitiesOpen ? 5 : 8}>
            <Map></Map>
          </Grid>
        </Grid>
      </Box>
    );
  }