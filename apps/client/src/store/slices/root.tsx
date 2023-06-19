import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";
import map from "./map";
import authentication from "./authentication";
import dateAndTime from "./dateAndTime";
import userCategoriesPriority from "./userCategoriesPriority";
import stepper from "./stepper";
import destination from "./destination";
import trip from "./trip";

const rootReducer = combineReducers({
  activity: activity,
  map: map,
  authentication: authentication,
  dateAndTime: dateAndTime,
  userCategoriesPriority: userCategoriesPriority,
  stepper: stepper,
  destination: destination,
  trip: trip
});

export default rootReducer;
