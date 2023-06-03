import { useSelector } from "react-redux";
import {
  fetchCurrentUser,
  fetchSignIn,
  fetchSignOut,
  fetchSignUp,
  selectAuthenticationError,
  selectCurrentUser,
  useAppDispatch,
} from "../store";
import auth from "../lib/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../store/slices/authentication";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectAuthenticationError);
  const currentUser = useSelector(selectCurrentUser);

  onAuthStateChanged(auth, (User) => {
    dispatch(setUser(User));
  });

  const SignUp = async (email: string, password: string) =>
    await dispatch(fetchSignUp({ email, password }));
  const SignIn = async (email: string, password: string) =>
    await dispatch(fetchSignIn({ email, password }));
  const SignOut = async () => await dispatch(fetchSignOut());
  const getCurrentUser = () => dispatch(fetchCurrentUser());

  return {
    currentUser,
    error,
    SignIn,
    SignUp,
    SignOut,
    getCurrentUser,
  };
};

export default useAuthentication;