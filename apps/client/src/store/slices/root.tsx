import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";
import map from "./map";
import stepper from "./stepper";
import authentication from "./authentication";
import dateAndTime from "./dateAndTime";
import userCategoriesPriority from "./userCategoriesPriority";

const rootReducer = combineReducers({
  activity: activity,
  map: map,
  stepper: stepper,
  authentication: authentication,
  dateAndTime: dateAndTime,
  userCategoriesPriority: userCategoriesPriority
});

export default rootReducer;
