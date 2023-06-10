import ITrip from "../../../client/src/interfaces/activity/trip";
import { createNewTripInDb } from "../models/native/trip";

export const createNewTrip = async (trip: ITrip) =>
  await createNewTripInDb(trip);
