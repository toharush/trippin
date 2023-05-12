import { DayRoute } from "./dayRoute";
import { MarkerPoint } from "./markerPoint";

export interface TotalRoute {
    duration: number;
    dayRoutes: DayRoute[];
}