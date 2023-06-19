import { useSelector } from "react-redux";
import {
  Activity,
  EntityTypes,
  ITripActivity,
  MarkerPoint,
} from "../interfaces";
import {
  fetchAllActivities,
  fetchNewCommentToServer,
  selectAllActivities,
  selectDestination,
  selectFilters,
  selectIsCommentPending,
  selectSelectedActivities,
  useAppDispatch,
} from "../store";
import activity, {
  setCatehoryFilter,
  setSelectedActivities,
} from "../store/slices/activity";
import useMapDrawer from "./useMapDrawer";
import useAuthentication from "./useAuthentication";
import useDestinations from "./useDestinations";
import { filter, isEmpty } from "lodash";
import { calculateDistance } from "../utils/cityCenter";
import { MAX_RADIUS } from "../config";

const useActivities = () => {
  const { currentUser } = useAuthentication();
  const {
    addMarkerPoint,
    removeMarkerPoint,
    setFlyTo,
    addMarkerPointsOfRoute,
  } = useMapDrawer();
  const dispatch = useAppDispatch();

  const selectedDestination = useSelector(selectDestination);
  const commentPending = useSelector(selectIsCommentPending);

  const selectedActivities = useSelector(selectSelectedActivities);
  const filters = useSelector(selectFilters);

  const activities = useSelector(selectAllActivities);

  const filterActivities = activities
    ?.filter((activity) =>
      !isEmpty(selectedDestination.name)
        ? calculateDistance(activity.position, selectedDestination.cityCenter) <
          (MAX_RADIUS ?? 50)
        : true
    )
    .filter((activity) =>
      !isEmpty(filters.category)
        ? activity.category.name?.toLowerCase().includes(filters.category!)
        : true
    );

  const fetchActivities = async () => await dispatch(fetchAllActivities());

  const removeSelectedActivity = async (activity: Activity) => {
    await removeMarkerPoint(activity.id);
    await dispatch(setSelectedActivities(activity));
  };

  const removeAllSelectedActivity = async () => {
    await selectedActivities.map(async (activity) => {
      await removeMarkerPoint(activity.id);
      await dispatch(setSelectedActivities(activity));
    });
  };

  const setActivitiesRouteOnMap = async (
    activities: (Activity | ITripActivity)[]
  ) => {
    const markerPoints: MarkerPoint[] = activities.map((activity) => {
      if ("activity" in activity) {
        activity = activity.activity;
      }
      return {
        id: activity.id,
        type: EntityTypes.activity,
        name: activity.title,
        location: [activity.position.lat, activity.position.lng],
        show: true,
        data: activity,
      };
    });
    await addMarkerPointsOfRoute(markerPoints);
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
    filterActivities,
    selectedActivities,
    filters,
    commentPending,
    addSelectedActivity,
    removeSelectedActivity,
    fetchActivities,
    setFilter,
    addComment,
    setActivitiesRouteOnMap,
    removeAllSelectedActivity,
  };
};

export default useActivities;
