import ICategory from "./category";
import ICoordinate from "./coordinate";
import { Google } from "./google";

// Before the algo run
export interface Activity {
  id: string;
  title: string;
  type: string;
  open_hour: Date;
  close_hour: Date;
  extra: any;
  category: ICategory;
  google: Google;
  address: any;
  position: ICoordinate;
  rate?: number;
  duration?: number;
  travelAndVisitTime?: number;  
  startTime?: Date;
  endTime?: Date;
  travelTime?: number;
}


// After the algo run
export interface ITripActivity {
  activity: Activity;
  start_time: Date;
  end_time: Date;
  travelTime: number;
}