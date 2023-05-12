import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectActivitiesMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import { AddMarkerPointToSelectedActivities, RemoveMarkerPointFromSelectedActivities } from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();

  const markers = useSelector(selectActivitiesMarkerPoints);
  const addMarker = async (markerPoint: MarkerPoint) => {
    await dispatch(AddMarkerPointToSelectedActivities(markerPoint));
  };
  const removeMarker = async (id: string) => {
    await dispatch(RemoveMarkerPointFromSelectedActivities(id));
  };

  const addMarkerPoint = (obj: MarkerPoint) => {
    // @ts-ignore
    addMarker(obj);
  };
  const removeMarkerPoint = (id: string) => {
    removeMarker(id);
  };
  return {
    markers,
    addMarkerPoint,
    removeMarkerPoint,
  };
};

export default useMapDrawer;
