import { Icon } from "leaflet";

export enum EntityTypes {
  "popup",
  "marker",
}

export interface MarkerPoint {
  id: string;
  name: string;
  type: EntityTypes;
  location: [number, number];
  icon?: Icon;
  data: any;
}
