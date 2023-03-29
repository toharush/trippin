import { Stack } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useActivities } from "../../hooks";
import { Activity as activity } from "../../interfaces";
import Activity from "../Activity/Activity";
import "./ActivitiesGallery.css";

export default function ActivitiesGallery() {
  const { selectedActivities } = useActivities();

  return (
    <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
      <div className="activities-list">
        {selectedActivities?.map((activity: activity) => (
          <Activity {...activity} imageUrl={"./The-Big-Ben.jpg"} isSelected />
        ))}
      </div>
    </Stack>
  );
}
