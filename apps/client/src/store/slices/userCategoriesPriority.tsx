import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserCategoriesPriorityState {
    userCategoriesPriority: Map<string,number>;
}

const DefaultPriorityValue= 5;

const initialState: UserCategoriesPriorityState = {
    userCategoriesPriority: new Map([
        ["Museums",DefaultPriorityValue],
        ["Resturants",DefaultPriorityValue],
        ["Shows",DefaultPriorityValue],
        ["Sport",DefaultPriorityValue],
        ["Night Life",DefaultPriorityValue],
        ["Shopping",DefaultPriorityValue],
        ["Nature",DefaultPriorityValue],
        ["Atractions",DefaultPriorityValue]
    ])
        
}

const stores = createSlice({
    name: "userCategoriesPriority",
    initialState: initialState,
    reducers: {
        SetUserCategoriesPriority: (state, action: PayloadAction<Map<string,number>>) => {
            return {
                ...state,
                userCategoriesPriority: action.payload,
            };
        },
    },
});

export const { SetUserCategoriesPriority } = stores.actions;
export default stores.reducer;