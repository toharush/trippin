import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import SideBar from '../SideBar/SideBar';

export default function GridComponent() {

    return (
      <Box sx={{ flexGrow:1 }}>
        <Grid container spacing={3}>
          <Grid xs={4}>
            <SideBar></SideBar>
          </Grid>
          <Grid xs={8}>
          </Grid>
        </Grid>
      </Box>
    );
  }