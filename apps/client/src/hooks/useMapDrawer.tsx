import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import { AddMarkerPoint, RemoveMarkerPoint } from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();

  const markers = useSelector(selectMarkerPoints);
  const addMarker = async (markerPoint: MarkerPoint) => {
    await dispatch(AddMarkerPoint(markerPoint));
  };
  const removeMarker = async (id: string) => {
    await dispatch(RemoveMarkerPoint(id));
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
