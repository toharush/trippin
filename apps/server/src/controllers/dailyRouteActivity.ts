import { createNewDailyRouteActivityInDb } from "../models/native/dailyRouteActivity";

export const createNewDailyRouteActivity = async (
  route_id: number,
  place_id: string
) => await createNewDailyRouteActivityInDb(route_id, place_id);
