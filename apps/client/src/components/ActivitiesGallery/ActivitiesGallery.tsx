import { Stack } from "@mui/system";
import { Activity as activity } from "../../interfaces/activity/activity";
import Activity from "../Activity/Activity";
import "./ActivitiesGallery.css";
import Paper from "@mui/material/Paper";

interface props {
  selectedActivities: activity[];
}
export default function ActivitiesGallery({ selectedActivities }: props) {
  return (
    <Paper elevation={0} style={{ maxHeight: "25vh", overflow: "auto", backgroundColor:"transparent" }}>
      <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
        <div className="activities-list">
          {selectedActivities?.map((activity: activity, index) => (
            <Activity activity={activity} isSelected />
          ))}
        </div>
      </Stack>
    </Paper>
  );
}
