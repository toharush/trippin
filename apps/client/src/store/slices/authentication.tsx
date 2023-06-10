import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerPoint } from "../../interfaces";
import {
  fetchCurrentUser,
  fetchSignIn,
  fetchSignOut,
  fetchSignUp,
} from "../middlewares";
import { User } from "firebase/auth";

interface AuthenticationState {
  curerrentUser: User | null;
  loading: boolean;
  authError: string | null;
}

const initialState: AuthenticationState = {
  curerrentUser: null,
  loading: false,
  authError: null,
};

const stores = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => ({
      ...state,
      curerrentUser: action.payload,
      error: null,
    }),
    setError: (state, action: PayloadAction<Error>) => ({
      ...state,
      authError: action.payload.name,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.rejected, (state, action) => ({
      ...state,
      authError: action.error?.code ?? "Unkown Error",
    }));
    builder.addCase(fetchSignUp.rejected, (state, action) => ({
      ...state,
      authError: action.error?.code ?? "Unkown Error",
    }));
    builder.addCase(fetchSignOut.rejected, (state, action) => ({
      ...state,
      authError: action.error?.code ?? "Unkown Error",
    }));
  },
});

export const { setUser, setError } = stores.actions;
export default stores.reducer;