import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectFlyTo, selectMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import {
  AddMarkerPoint,
  RemoveMarkerPoint,
  SetFlyTo,
} from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();
  const flyTo = useSelector(selectFlyTo);
  const markers = useSelector(selectMarkerPoints);

  const setFlyTo = (latlng: [number, number], zoom: number) => {
    dispatch(SetFlyTo({ latlng, zoom }));
  };
  const addMarkerPoint = async (markerPoint: MarkerPoint) =>
    await dispatch(AddMarkerPoint(markerPoint));
    
  const removeMarkerPoint = async (id: string) =>
    await dispatch(RemoveMarkerPoint(id));

  return {
    markers,
    flyTo,
    setFlyTo,
    addMarkerPoint,
    removeMarkerPoint,
  };
};

export default useMapDrawer;
