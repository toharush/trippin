import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";
import map from "./map";
import stepper from "./stepper";

const rootReducer = combineReducers({
    activity: activity,
    map: map,
    stepper: stepper,
});

export default rootReducer;
