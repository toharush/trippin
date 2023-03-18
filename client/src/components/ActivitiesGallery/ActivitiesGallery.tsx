import { Stack } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Activity from "../Activity/Activity";

interface activity {
    name: string,
    imgURL: string
}

export default function ActivitiesGallery() {
    const activities : activity[]  = 
    [
        {
            name: 'London-Eye',
            imgURL: "./London-Eye.jpg"
        },
        {
            name: 'The-Big-Ben',
            imgURL: './The-Big-Ben.jpg'
        }
    ];
    return(
        <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
            <Grid container>
                {activities.map((activity: activity) => 
                (<Grid xs={10} sm={10} md={10} ><Activity {...activity}></Activity></Grid>))}
            </Grid>
        </Stack>
    );
}