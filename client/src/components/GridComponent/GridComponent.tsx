import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import SideBar from '../SideBar/SideBar';
import Map from '../Map/Map';

export default function GridComponent() {

    return (
      <Box sx={{ flexGrow:1 }}>
        <Grid container>
          <Grid xs={4}>
            <SideBar></SideBar>
          </Grid>
          <Grid xs={8}>
            <Map></Map>
          </Grid>
        </Grid>
      </Box>
    );
  }