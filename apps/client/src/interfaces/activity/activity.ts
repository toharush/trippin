import ICoordinate from "./coordinate";
import { Google } from "./google";
export interface Activity {
  id: string;
  title: string;
  type: string;
  open_hour: number;
  close_hour: number;
  extra: any;
  category: any;
  google: Google;
  address: any;
  position: ICoordinate;
  rate?: number;
  duration?: number;
  travelAndVisitTime?: number;
  startTime?: number;
  endTime?: number;
}
