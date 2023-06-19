import ITrip from "../../../../client/src/interfaces/activity/trip";
import { query } from "../../utils/sqlQuery";
import { deleteDailyRouteByTripIdFromDb } from "./dailyRoute";
import { deleteDailyRouteActivityByRouteIdFromDb } from "./dailyRouteActivity";

export const createNewTripInDb = async (
  trip: ITrip,
  user_id: string
): Promise<number> => {
  return await (
    await query(
      `INSERT INTO trippin.trip(
        name, creation_date, start_date, end_date, user_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
      [trip.name, trip.creation_date, trip.start_date, trip.end_date, user_id]
    )
  ).rows[0]?.id;
};

export const deleteTripFromDb = async (trip_id: number): Promise<boolean> => {
  // Delete dailyRouteActivities by trip_id
  let result = await query(
    `SELECT id FROM trippin.daily_route WHERE trip_id = $1`,
    [trip_id]
  );
  if (result.rowCount > 0) {
    for (const dailyRoute of result.rows) {
      await deleteDailyRouteActivityByRouteIdFromDb(dailyRoute.id);
    }
    // Delete dailyRoutes by trip_id
    await deleteDailyRouteByTripIdFromDb(trip_id);
    // Delete the trip
    result = await query(`DELETE FROM trippin.trip WHERE id = $1`, [
      trip_id,
    ]);
  }
  return result.rowCount > 0;
}