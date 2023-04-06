import { RootState } from "../store";

export const selectIsAppInitilized = (state: RootState) => !state.activity.loading;
