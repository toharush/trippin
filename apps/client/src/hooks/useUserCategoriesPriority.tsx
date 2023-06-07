import { MarkerPoint } from "../../../../interfaces/markerPoint";
import { useSelector } from "react-redux";
import { selectFlyTo, selectActivitiesMarkerPoints } from "../store/selectors/map";
import { useAppDispatch } from "../store";
import { selectUserCategoriesPriority } from "../store/selectors/userCategoriesPriority";

const useUserCategoriesPriority = () => {
  const dispatch = useAppDispatch();
  const userCategoriesPriority = useSelector(selectUserCategoriesPriority);

 
  return {
    userCategoriesPriority
  };
};

export default useUserCategoriesPriority;