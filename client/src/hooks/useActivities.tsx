import { useSelector } from "react-redux";
import { Activity } from "../interfaces";
import { isEmpty, union, uniqBy } from "lodash";
import {
  fetchAllActivities,
  selectAllActivities,
  selectSelectedActivities,
  useAppDispatch,
} from "../store";
import { setSelectedActivities } from "../store/slices/activity";

const useActivities = () => {
  const dispatch = useAppDispatch();
  const selectedActivities = useSelector(selectSelectedActivities);
  const activities = useSelector(selectAllActivities);

  const fetchActivities = async () => {
    await dispatch(fetchAllActivities());
  };

  const addSelectedActivity = async (activity: Activity) => {
    await dispatch(setSelectedActivities([activity]));
  };

  const searchActivity = (name: string | undefined) => {
    return name && !isEmpty(name)
      ? activities?.filter((activity) =>
          activity.title.toUpperCase().includes(name.toUpperCase())
        )
      : [];
  };

  return {
    activities,
    selectedActivities,
    addSelectedActivity,
    fetchActivities,
    searchActivity,
  };
};

export default useActivities;
