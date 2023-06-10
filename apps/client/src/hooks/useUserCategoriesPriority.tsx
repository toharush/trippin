import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { selectUserCategoriesPriority } from "../store/selectors/userCategoriesPriority";
import { SetUserCategoriesPriority } from "../store/slices/userCategoriesPriority";

const useUserCategoriesPriority = () => {
  const dispatch = useAppDispatch();
  const userCategoriesPriority = useSelector(selectUserCategoriesPriority);

  const setCategoriesPriority = (category: string, value: number) => {
    dispatch(SetUserCategoriesPriority({ category, value }));
  };

  return {
    userCategoriesPriority,
    setCategoriesPriority,
  };
};

export default useUserCategoriesPriority;
