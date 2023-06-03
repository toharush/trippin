import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";
import map from "./map";
import authentication from "./authentication";
import dateAndTime from "./dateAndTime";

const rootReducer = combineReducers({
  activity: activity,
  map: map,
  authentication: authentication,
  dateAndTime: dateAndTime,
});

export default rootReducer;
