import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  firebaseSignIn,
  firebasecreateUser,
  getCurrentUserFromFireBase,
  signOutFromFirebase,
} from "../../services/firebase";

export const fetchSignIn = createAsyncThunk(
  "authentication/SignIn",
  async (props: { email: string; password: string }) =>
    await firebaseSignIn(props.email, props.password)
);

export const fetchSignUp = createAsyncThunk(
  "authentication/SignUp",
  async (props: { email: string; password: string }) =>
    await firebasecreateUser(props.email, props.password)
);

export const fetchSignOut = createAsyncThunk(
  "authentication/SignOut",
  async (props) => await signOutFromFirebase()
);

export const fetchCurrentUser = createAsyncThunk(
  "authentication/CurrentUser",
  async (props) => await getCurrentUserFromFireBase()
);
