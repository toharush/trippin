import { Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid/Grid";
import ClearIcon from "@mui/icons-material/Clear";
import { Activity as activity } from "../../../../../interfaces";
import "./Activity.css";
import { useActivities } from "../../hooks";

interface ActivityProps {
  activity: activity;
  isSelected?: boolean;
}

export default function Activity({ activity, isSelected }: ActivityProps) {
  const { setSelectActivity } = useActivities();

  const handleChangeSelectedActivities = () => {
    setSelectActivity(activity);
  };

  return (
    <Box className="row">
      <Grid container>
        <Grid xs={4}>
          <img className="img" src={activity?.imageUrl} alt="" />
        </Grid>
        <Grid xs={8}>
          <button onClick={handleChangeSelectedActivities}>
            {isSelected ? "Remove" : "Add"}
          </button>
          <p className="text">{activity.title}</p>
          <button className="button">
            <ClearIcon className="icon" />
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}
