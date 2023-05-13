import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../interfaces";
import { fetchCurrentUser, fetchSignIn, fetchSignUp } from "../middlewares";
import { User } from "firebase/auth";

interface AuthenticationState {
  curerrentUser: User | null;
  loading: boolean;
}

const initialState: AuthenticationState = {
  curerrentUser: null,
  loading: false,
};

const stores = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSignIn.fulfilled,
      (state, action: PayloadAction<null | User>) => {
        state.curerrentUser = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<null | User>) => {
        state.curerrentUser = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchSignIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = stores.actions;
export default stores.reducer;
