import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IClientCategory from "../../interfaces/activity/clientCategory";

interface UserCategoriesPriorityState {
  userCategoriesPriority: IClientCategory[];
}

const DefaultPriorityValue = 5;

const initialState: UserCategoriesPriorityState = {
  userCategoriesPriority: [
    { categoryName: "Museums", categoryPreference: DefaultPriorityValue },
    { categoryName: "Resturants", categoryPreference: DefaultPriorityValue },
    { categoryName: "Shows", categoryPreference: DefaultPriorityValue },
    { categoryName: "Sport", categoryPreference: DefaultPriorityValue },
    { categoryName: "Night Life", categoryPreference: DefaultPriorityValue },
    { categoryName: "Shopping", categoryPreference: DefaultPriorityValue },
    { categoryName: "Nature", categoryPreference: DefaultPriorityValue },
    { categoryName: "Atractions", categoryPreference: DefaultPriorityValue },
  ],
};

const stores = createSlice({
  name: "userCategoriesPriority",
  initialState: initialState,
  reducers: {
    SetUserCategoriesPriority: (
      state,
      action: PayloadAction<{ category: string; value: number }>
    ) => {
      const { payload } = action;
      const { category, value } = payload;
      const newPreferences = state.userCategoriesPriority.map((cat) => {
        if (cat.categoryName === category) {
          return { ...cat, categoryPreference: value };
        }
        return cat;
      });
      return {
        userCategoriesPriority: newPreferences,
      };
    },
  },
});

export const { SetUserCategoriesPriority } = stores.actions;
export default stores.reducer;
