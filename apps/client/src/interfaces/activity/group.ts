import { Activity } from "./activity";

export default interface IGroup {
  centerActivity: Activity;
  selectedActivities: Activity[];
}
