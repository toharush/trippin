import { useSelector } from "react-redux";
import {
  fetchCurrentUser,
  fetchSignIn,
  fetchSignOut,
  fetchSignUp,
  selectCurrentUser,
  useAppDispatch,
} from "../store";
import { useEffect } from "react";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const SignUp = async (email: string, password: string) =>
    await dispatch(fetchSignUp({ email, password }));
  const SignIn = async (email: string, password: string) =>
    await dispatch(fetchSignIn({ email, password }));
  const SignOut = async () => await dispatch(fetchSignOut());
  const getCurrentUser = async () => await dispatch(fetchCurrentUser());

  return {
    currentUser,
    SignIn,
    SignUp,
    SignOut,
    getCurrentUser,
  };
};

export default useAuthentication;
