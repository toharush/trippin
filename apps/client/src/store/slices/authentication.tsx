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
}

const initialState: AuthenticationState = {
  curerrentUser: null,
  loading: false,
};

const stores = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => ({
      ...state,
      curerrentUser: action.payload,
    }),
  },
  extraReducers: (builder) => {},
});

export const { setUser } = stores.actions;
export default stores.reducer;
