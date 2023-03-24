import Box from '@mui/material/Box';
import { useStyles } from './ActivitiesSidebarComponentStyle';
import SearchComponent from '../SearchComponent/SearchComponent';

export default function ActivitiesSidebarComponent() {

const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
        <SearchComponent title='Search for activities'></SearchComponent>      
    </Box>
  );
}

