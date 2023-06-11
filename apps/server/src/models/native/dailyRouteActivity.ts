import { query } from "../../utils/sqlQuery";

export const createNewDailyRouteActivityInDb = async (
  route_id: number,
  place_id: string,
  start_time: Date,
  end_time: Date
) => {
  return await query(
    `INSERT INTO trippin.daily_route_activity(daily_route_id, place_id, start_time, end_time) VALUES ($1, $2, $3, $4);`,
    [route_id, place_id, start_time, end_time]
  );
};
