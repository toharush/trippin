import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SignIn from "../../components/SignIn/SignIn";
import { useAuthentication } from "../../hooks";
import { useState } from "react";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";

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
      <AuthHeader onClick={handleAuth} userName={currentUser?.email} />
    </>
  );
};

export default Authentication;
