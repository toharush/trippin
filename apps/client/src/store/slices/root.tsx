import { combineReducers } from "@reduxjs/toolkit";
import activity from "./activity";

const rootReducer = combineReducers({
    activity: activity
});

export default rootReducer;
