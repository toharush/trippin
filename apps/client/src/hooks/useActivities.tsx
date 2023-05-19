import { useSelector } from "react-redux";
import { Activity, EntityTypes } from "../interfaces";
import { isEmpty } from "lodash";
import {
  fetchAllActivities,
  selectAllActivities,
  selectFilters,
  selectSelectedActivities,
  useAppDispatch,
} from "../store";
import {
  removeAllSelectedActivities,
  setCatehoryFilter,
  removeStoreSelectedActivity,
  addStoreSelectedActivity,
} from "../store/slices/activity";
import { useState } from "react";
import useMapDrawer from "./useMapDrawer";

const useActivities = () => {
  const dispatch = useAppDispatch();
  const { addMarkerPoint, removeMarkerPoint, setFlyTo } = useMapDrawer();
  const selectedActivities = useSelector(selectSelectedActivities);
  const activities = useSelector(selectAllActivities);
  const filters = useSelector(selectFilters);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchActivities = async () => {
    await dispatch(fetchAllActivities());
  };

  const removeSelectedActivity = async (activity: Activity) => {
    await removeMarkerPoint(activity.id);
    await dispatch(removeStoreSelectedActivity(activity));
    await search();
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
    await dispatch(addStoreSelectedActivity(activity));
  };

  const searchActivity = async (name: string | undefined) => {
    const newName = name ?? "";
    await setSearchString(newName);
    await search();
  };

  const search = async () => {
    let val = [];
    if (searchString !== "" && !isEmpty(searchString)) {
      // @ts-ignore
      val = activities?.filter(
        (activity) =>
          selectedActivities.filter((act) => act.id != activity.id) &&
          (isEmpty(filters.category) ||
            activity.category?.name
              ?.toLowerCase()
              .includes(filters.category)) &&
          activity.title.toUpperCase().includes(searchString.toUpperCase())
      );
    }
    // @ts-ignore
    await setSearchResults(val);
  };

  const setFilter = async (filter: string) => {
    let newFilter = null;
    if (filter !== filters.category) {
      newFilter = filter;
    }
    await dispatch(setCatehoryFilter(newFilter));
    await search();
  };

  const clearSelectedActivities = async () => {
    await dispatch(removeAllSelectedActivities);
  };

  return {
    addSelectedActivity,
    removeSelectedActivity,
    fetchActivities,
    searchActivity,
    setFilter,
    clearSelectedActivities,
    filters,
    searchResults,
    activities,
    selectedActivities,
  };
};

export default useActivities;
