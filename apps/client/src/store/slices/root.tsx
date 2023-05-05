import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";
import map from "./map";

const rootReducer = combineReducers({
    activity: activity,
    map: map
});

export default rootReducer;
