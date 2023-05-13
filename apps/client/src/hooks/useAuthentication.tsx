import { useSelector } from "react-redux";
import {
  fetchSignIn,
  fetchSignOut,
  fetchSignUp,
  selectCurrentUser,
  useAppDispatch,
} from "../store";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const SignUp = async (email: string, password: string) =>
    await dispatch(fetchSignUp({ email, password }));
  const SignIn = async (email: string, password: string) =>
    await dispatch(fetchSignIn({ email, password }));
  const SignOut = async () => await dispatch(fetchSignOut());

  return {
    currentUser,
    SignIn,
    SignUp,
    SignOut,
  };
};

export default useAuthentication;
