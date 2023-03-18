import { Box } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useStyles } from './ActivityStyle';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

interface activity {
    name: string,
    imgURL: string
}

export default function Activity(activity :activity) {
    const classes = useStyles();

    return(
        <Box className={classes.row}>
            <Grid container>
                    <Grid xs={4}>
                        <img className={classes.img} src={activity.imgURL} alt=""></img>
                    </Grid>
                    <Grid xs={8}>
                        <p className={classes.text}>{activity.name}</p>
                        <button className={classes.button}>
                        <ClearIcon className={classes.icon} />
                        </button>
                    </Grid>
            </Grid>
        </Box>
    );
}