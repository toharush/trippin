import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllActivities } from "../../services";

export const fetchAllActivities = createAsyncThunk(
  "activity/AllActivities",
  async (props) => await getAllActivities()
);
