import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import { AddMarkerPoint, RemoveMarkerPoint } from "../store/slices/map";

const useMapDrawer = () => {
  const dispatch = useAppDispatch();
  const markers = useSelector(selectMarkerPoints);

  const addMarkerPoint = async (markerPoint: MarkerPoint) =>
    await dispatch(AddMarkerPoint(markerPoint));
  const removeMarkerPoint = async (id: string) =>
    await dispatch(RemoveMarkerPoint(id));

  return {
    markers,
    addMarkerPoint,
    removeMarkerPoint,
  };
};

export default useMapDrawer;
