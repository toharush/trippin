import { Activity } from "./activity";

export default interface IDailyRoute {
  date: Date;
  index: number;
  activities: Activity[];
  extraActivities: Activity[];
}
