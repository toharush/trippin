import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectFlyTo, selectActivitiesMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import {
  AddMarkerPointToSelectedActivities,
  RemoveMarkerPointFromSelectedActivities, 
  SetFlyTo,
} from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();
  const flyTo = useSelector(selectFlyTo);
  const markers = useSelector(selectActivitiesMarkerPoints);

  const setFlyTo = (latlng: [number, number], zoom: number) => {
    dispatch(SetFlyTo({ latlng, zoom }));
  };
  const addMarkerPoint = async (markerPoint: MarkerPoint) =>
    await dispatch(AddMarkerPointToSelectedActivities(markerPoint));
    
  const removeMarkerPoint = async (id: string) =>
    await dispatch(RemoveMarkerPointFromSelectedActivities(id));

  return {
    markers,
    flyTo,
    setFlyTo,
    addMarkerPoint,
    removeMarkerPoint,
  };
};

export default useMapDrawer;
