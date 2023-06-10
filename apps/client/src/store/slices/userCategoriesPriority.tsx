import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IClientCategory from "../../interfaces/activity/clientCategory";

interface UserCategoriesPriorityState {
  userCategoriesPriority: IClientCategory[];
}

const DefaultPriorityValue = 5;

const initialState: UserCategoriesPriorityState = {
  userCategoriesPriority: [
    { key: "Museums", value: DefaultPriorityValue },
    { key: "Resturants", value: DefaultPriorityValue },
    { key: "Shows", value: DefaultPriorityValue },
    { key: "Sport", value: DefaultPriorityValue },
    { key: "Night Life", value: DefaultPriorityValue },
    { key: "Shopping", value: DefaultPriorityValue },
    { key: "Nature", value: DefaultPriorityValue },
    { key: "Atractions", value: DefaultPriorityValue },
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
        if (cat.key === category) {
          return { ...cat, value: value };
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
