import { Stack } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useActivities } from "../../hooks";
import { Activity as activity } from "../../interfaces";
import Activity from "../Activity/Activity";

// interface activity {
//   name: string;
//   imgURL: string;
// }

export default function ActivitiesGallery() {
  const { selectedActivities } = useActivities();

  return (
    <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
      <Grid container>
        {selectedActivities?.map((activity: activity) => (
          <Grid xs={10} sm={10} md={10}>
            <Activity {...activity} imageUrl={"./The-Big-Ben.jpg"} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
