import IDailyRoute from "../../../../client/src/interfaces/activity/dailyRoute";
import { query } from "../../utils/sqlQuery";

export const createNewDailyRouteInDb = async (
  trip_id: number,
  route: IDailyRoute
): Promise<number> => {
  return await (
    await query(
      `INSERT INTO trippin.daily_route(
         trip_id, date, index)
        VALUES ($1, $2, $3) RETURNING id;`,
      [trip_id, route.date, route.index]
    )
  ).rows[0]?.id;
};
