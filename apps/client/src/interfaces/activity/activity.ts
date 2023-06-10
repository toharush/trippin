import ICoordinate from "./coordinate";
import { Google } from "./google";
export interface Activity {
  id: string;
  title: string;
  type: string;
  open_hour: Date;
  close_hour: Date;
  extra: any;
  category: any;
  google: Google;
  address: any;
  position: ICoordinate;
  rate?: number;
  duration?: number;
  travelAndVisitTime?: number;
  startTime?: Date;
  endTime?: Date;
}
