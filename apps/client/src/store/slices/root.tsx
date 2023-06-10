import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";
import map from "./map";
import authentication from "./authentication";
import dateAndTime from "./dateAndTime";
import userCategoriesPriority from "./userCategoriesPriority";
import stepper from "./stepper";

const rootReducer = combineReducers({
  activity: activity,
  map: map,
  authentication: authentication,
  dateAndTime: dateAndTime,
  userCategoriesPriority: userCategoriesPriority,
  stepper: stepper,
});

export default rootReducer;
