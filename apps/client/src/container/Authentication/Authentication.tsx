import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SignIn from "../../components/SignIn/SignIn";
import { useAuthentication } from "../../hooks";
import { useState } from "react";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
import SharedContact from "../../components/UserMenuComponent/UserMenuComponent";
import UserMenu from "../UserMenu/UserMenu";

const Authentication = () => {
  const [openAuth, setOpenAuth] = useState<boolean>(false);
  const { currentUser, SignIn, SignUp } = useAuthentication();

  const handleAuth = () => {
    setOpenAuth(!openAuth);
  };

  return (
    <>
      {openAuth ? (
        <AuthenticationForm
          open={openAuth}
          setOpen={setOpenAuth}
          handleSignIn={SignIn}
          handleSignUp={SignUp}
        />
      ) : null}
      {currentUser ? <UserMenu /> : <AuthHeader onClick={handleAuth} />}
    </>
  );
};

export default Authentication;
