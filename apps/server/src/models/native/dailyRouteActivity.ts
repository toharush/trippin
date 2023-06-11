import { query } from "../../utils/sqlQuery";

export const createNewDailyRouteActivityInDb = async (
  route_id: number,
  place_id: string
) => {
  return await query(
    `INSERT INTO trippin.daily_route_activity(daily_route_id, place_id) VALUES ($1, $2);`,
    [route_id, place_id]
  );
};
