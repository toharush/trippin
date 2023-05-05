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

const useActivities = () => {
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
          activity.category?.name?.includes(filters.category) &&
          activity.title.toUpperCase().includes(searchString.toUpperCase())
      );
    }
    // @ts-ignore
    await setSearchResults(val);
    console.log(filters.category);
  };

  const setFilter = async (filter: string) => {
    await dispatch(setCatehoryFilter(filter));
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
