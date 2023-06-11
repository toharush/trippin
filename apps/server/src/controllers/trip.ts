import ITrip from "../../../client/src/interfaces/activity/trip";
import { createNewTripInDb } from "../models/native/trip";
import { createNewDailyRoute } from "./dailyRoute";

export const createNewTrip = async (trip: ITrip, user_id: string) => {
  const tripId = await createNewTripInDb(trip, user_id);
  trip.routes.map(async (route) => await createNewDailyRoute(tripId, route));

  return tripId;
};
