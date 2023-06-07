import { RootState } from "../store";

export const selectUserCategoriesPriority = (state: RootState):  Map<string,number>=> state.userCategoriesPriority.userCategoriesPriority;