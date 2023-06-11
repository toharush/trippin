import { Activity, ITripActivity } from "./activity";

export default interface IDailyRoute {
  date: Date;
  index: number;
  activities: (ITripActivity | Activity)[];
}
