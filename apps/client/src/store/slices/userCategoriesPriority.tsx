import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';

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
        SetUserCategoriesPriority: (state, action: PayloadAction<{ category: string; value: number }>) => {
            const { payload } = action;
            const { category, value }= payload;
            state.userCategoriesPriority.set(category,value);
            return {
                ...state,
                userCategoriesPriority: state.userCategoriesPriority
            }
        },
    },
});

export const { SetUserCategoriesPriority } = stores.actions;
export default stores.reducer;