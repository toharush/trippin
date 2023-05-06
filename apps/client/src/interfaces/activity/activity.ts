import { Google } from "./google";
export interface Activity {
  id: string;
  title: string;
  type: string;
  open_hours: [];
  extra: any;
  category: any;
  google: Google;
  address: any;
  position: any;
}
