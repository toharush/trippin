import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewComment, getAllActivities } from "../../services";

export const fetchAllActivities = createAsyncThunk(
  "activity/AllActivities",
  async (props) => await getAllActivities()
);

export const fetchNewCommentToServer = createAsyncThunk(
  "activity/newComment",
  async (props: { place_id: string; user_id: string; text: string }) =>
    await fetchNewComment(props.place_id, props.user_id, props.text)
);
