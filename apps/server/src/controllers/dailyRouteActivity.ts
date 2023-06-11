import { createNewDailyRouteActivityInDb } from "../models/native/dailyRouteActivity";

export const createNewDailyRouteActivity = async (
  route_id: number,
  place_id: string,
  start_time: Date,
  end_time: Date
) => await createNewDailyRouteActivityInDb(route_id, place_id, start_time, end_time);
