import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectFlyTo, selectActivitiesMarkerPoints, selectDayRoutes } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import {
  AddMarkerPointToSelectedActivities,
  RemoveMarkerPointFromSelectedActivities, 
  HideAllSelectedActivitiesMarkers,
  SetFlyTo,
  ShowDayRoute,
} from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();
  const flyTo = useSelector(selectFlyTo);
  const selectedActivitiesMarkers = useSelector(selectActivitiesMarkerPoints);
  const selectedDayRoutes = useSelector(selectDayRoutes);

  const setFlyTo = (latlng: [number, number], zoom: number) => {
    dispatch(SetFlyTo({ latlng, zoom }));
  };
  const addMarkerPoint = async (markerPoint: MarkerPoint) => {
    await dispatch(AddMarkerPointToSelectedActivities(markerPoint));
    console.log(JSON.stringify(markerPoint));
  }
      
  const removeMarkerPoint = async (id: string) =>
    await dispatch(RemoveMarkerPointFromSelectedActivities(id));

  const hideSelectedActivities = async () =>
    await dispatch(HideAllSelectedActivitiesMarkers());

  const showDayRoute= async (dayNumber: number) => {
    await dispatch(ShowDayRoute(dayNumber));
  }
  return {
    selectedActivitiesMarkers,
    flyTo,
    setFlyTo,
    addMarkerPoint,
    removeMarkerPoint,
    hideSelectedActivities,
    showDayRoute,
    selectedDayRoutes
  };
};

export default useMapDrawer;
