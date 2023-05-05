import { useSelector } from "react-redux";
import { Activity } from "../../../../interfaces";
import { isEmpty } from "lodash";
import {
  fetchAllActivities,
  selectAllActivities,
  selectFilters,
  selectSelectedActivities,
  useAppDispatch,
} from "../store";
import {
  setCatehoryFilter,
  setSelectedActivities,
} from "../store/slices/activity";
import { useState } from "react";
import useMapDrawer from "./useMapDrawer";
import { RemoveMarkerPoint } from "../store/slices/map";

const useActivities = () => {

  const { addMarkerPoint } = useMapDrawer();
  const dispatch = useAppDispatch();
  const selectedActivities = useSelector(selectSelectedActivities);
  const activities = useSelector(selectAllActivities);
  const filters = useSelector(selectFilters);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchActivities = async () => {
    await dispatch(fetchAllActivities());
  };

  const setSelectActivity = async (activity: Activity) => {
    if (activities?.find(act => act.id !== activity.id)) {
      await RemoveMarkerPoint(activity.id);
    }
    else {
      await addMarkerPoint({ id: activity.id, type: "popup", name: activity.title, location: [activity.position.lat, activity.position.lng] })
    }
    await dispatch(setSelectedActivities(activity));
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

  return {
    activities,
    selectedActivities,
    setSelectActivity,
    fetchActivities,
    searchActivity,
    setFilter,
    filters,
    searchResults,
  };
};

export default useActivities;
