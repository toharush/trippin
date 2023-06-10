import ITrip from "../../../client/src/interfaces/activity/trip";
import { createNewTripInDb } from "../models/native/trip";

export const createNewTrip = async (trip: ITrip, user_id: string) =>
  await createNewTripInDb(trip, user_id);
