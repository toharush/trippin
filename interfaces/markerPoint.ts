import { Icon } from "leaflet";

export interface MarkerPoint {
    id: string;
    name: string;
    type: "popup" | "marker";
    location: [number, number];
    icon?: Icon;
    component: any;
    data: any;
}

export enum Types {
    "popup",
    "marker"
}