import { Google } from "./google";
export interface Activity {
  id: string;
  title: string;
  type: string;
  open_hours: any[] | null;
  extra: any;
  category: any;
  google: Google | null;
  address: any;
  position: any;
}
