import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";
import map from "./map";
import stepper from "./stepper";
import authentication from "./authentication";

const rootReducer = combineReducers({
  activity: activity,
  map: map,
  stepper: stepper,
  authentication: authentication,
});

export default rootReducer;
