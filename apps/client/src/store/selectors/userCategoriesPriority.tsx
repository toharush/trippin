import IClientCategory from "../../interfaces/activity/clientCategory";
import { RootState } from "../store";

export const selectUserCategoriesPriority = (state: RootState):  IClientCategory[]=> state.userCategoriesPriority.userCategoriesPriority;