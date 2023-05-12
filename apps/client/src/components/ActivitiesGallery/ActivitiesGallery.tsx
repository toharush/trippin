import { Stack } from "@mui/system";
import { Activity as activity } from "../../../../../interfaces";
import Activity from "../Activity/Activity";
import "./ActivitiesGallery.css";

interface props {
  selectedActivities: activity[];
}
export default function ActivitiesGallery({ selectedActivities }: props) {
  return (
    <Stack spacing={{ xs: 1, sm: 1, md: 5 }}>
      <div className="activities-list">
        {selectedActivities?.map((activity: activity, index) => (
          <Activity activity={activity} isSelected />
        ))}
      </div>
    </Stack>
  );
}
