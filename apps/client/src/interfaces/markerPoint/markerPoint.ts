import { Icon } from "leaflet";

export enum EntityTypes {
  "popup",
  "marker",
  "activity"
}

export interface MarkerPoint {
  id: string;
  name: string;
  type: EntityTypes;
  location: [number, number];
  icon?: Icon;
  show: boolean;
  data: any;
}
