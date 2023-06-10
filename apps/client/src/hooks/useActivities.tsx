import { useSelector } from "react-redux";
import { Activity, EntityTypes } from "../interfaces";
import { differenceBy, isEmpty } from "lodash";
import {
  fetchAllActivities,
  fetchNewCommentToServer,
  selectAllActivities,
  selectFilters,
  selectIsCommentPending,
  selectSelectedActivities,
  useAppDispatch,
} from "../store";
import {
  setCatehoryFilter,
  setSelectedActivities,
} from "../store/slices/activity";
import { useEffect, useState } from "react";
import useMapDrawer from "./useMapDrawer";
import useAuthentication from "./useAuthentication";
import { fetchNewComment } from "../services";

const useActivities = () => {
  const { currentUser } = useAuthentication();
  const { addMarkerPoint, removeMarkerPoint, setFlyTo } = useMapDrawer();
  const dispatch = useAppDispatch();
  const commentPending = useSelector(selectIsCommentPending);

  const selectedActivities = useSelector(selectSelectedActivities);
  const activities = useSelector(selectAllActivities);
  const filters = useSelector(selectFilters);

  const fetchActivities = async () => {
    await dispatch(fetchAllActivities());
  };

  const removeSelectedActivity = async (activity: Activity) => {
    await removeMarkerPoint(activity.id);
    await dispatch(setSelectedActivities(activity));
  };

  const addSelectedActivity = async (activity: Activity) => {
    setFlyTo([activity.position.lat, activity.position.lng], 8);
    await addMarkerPoint({
      id: activity.id,
      type: EntityTypes.activity,
      name: activity.title,
      location: [activity.position?.lat, activity.position?.lng],
      show: true,
      data: activity,
    });
    await dispatch(setSelectedActivities(activity));
  };

  const addComment = async (place_id: string, text: string) => {
    if (currentUser?.email) {
      await dispatch(
        fetchNewCommentToServer({
          place_id,
          user_id: currentUser.email,
          text,
        })
      );
    } else {
      console.log("non fetchNewComment");
    }
  };

  const setFilter = async (filter: string) => {
    let newFilter = null;
    if (filter !== filters.category) {
      newFilter = filter;
    }
    await dispatch(setCatehoryFilter(newFilter));
  };

  return {
    activities,
    selectedActivities,
    addSelectedActivity,
    removeSelectedActivity,
    fetchActivities,
    setFilter,
    addComment,
    filters,
    commentPending,
  };
};

export default useActivities;
