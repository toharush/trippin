import { Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useStyles } from "./ActivityStyle";
import ClearIcon from "@mui/icons-material/Clear";
import { Activity as activity } from "../../interfaces";

export default function Activity(activity: activity) {
  const classes = useStyles();

  return (
    <Box className={classes.row}>
      <Grid container>
        <Grid xs={4}>
          <img className={classes.img} src={activity?.imageUrl} alt=""></img>
        </Grid>
        <Grid xs={8}>
          <p className={classes.text}>{activity.title}</p>
          <button className={classes.button}>
            <ClearIcon className={classes.icon} />
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}
