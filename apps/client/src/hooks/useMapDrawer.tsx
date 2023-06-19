import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectFlyTo, selectActivitiesMarkerPoints, selectRoutesMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import {
  AddMarkerPointToSelectedActivities,
  RemoveMarkerPointFromSelectedActivities, 
  SetFlyTo,
  SetMarkerPointsOfRoute
} from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();
  const flyTo = useSelector(selectFlyTo);
  const markers = useSelector(selectActivitiesMarkerPoints);
  const routesMarkers = useSelector(selectRoutesMarkerPoints);

  const setFlyTo = (latlng: [number, number], zoom: number) => {
    dispatch(SetFlyTo({ latlng, zoom }));
  };
  const addMarkerPoint = async (markerPoint: MarkerPoint) =>
    await dispatch(AddMarkerPointToSelectedActivities(markerPoint));
    
  const removeMarkerPoint = async (id: string) =>
    await dispatch(RemoveMarkerPointFromSelectedActivities(id));

  const addMarkerPointsOfRoute = async(points: MarkerPoint[]) => {
    await dispatch(SetMarkerPointsOfRoute(points));
  }

  return {
    markers,
    routesMarkers,
    flyTo,
    setFlyTo,
    addMarkerPoint,
    removeMarkerPoint,
    addMarkerPointsOfRoute
  };
};

export default useMapDrawer;
