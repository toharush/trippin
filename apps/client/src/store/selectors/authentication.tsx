import { RootState } from "../store";

export const selectCurrentUser = (state: RootState) =>
  state.authentication.curerrentUser;

export const selectAuthenticationError = (state: RootState) =>
  state.authentication.authError;