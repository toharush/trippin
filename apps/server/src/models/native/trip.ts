import ITrip from "../../../../client/src/interfaces/activity/trip";
import { query } from "../../utils/sqlQuery";

export const createNewTripInDb = async (
  trip: ITrip,
  user_id: string
): Promise<number> => {
  return await (
    await query(
      `INSERT INTO trippin.trip(
        name, creation_date, start_date, end_date, user_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
      [trip.name, trip.creationDate, trip.startDate, trip.endDate, user_id]
    )
  ).rows[0]?.id;
};
