import { Activity } from "../activity/activity";

export default interface IRoute {
  day: number;
  activities: Activity[];
}
