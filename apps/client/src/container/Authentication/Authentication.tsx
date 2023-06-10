import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { useAuthentication } from "../../hooks";
import { useState, useEffect } from "react";
import AuthenticationForm from "../AuthenticationForm/AuthenticationForm";
import UserMenu from "../UserMenu/UserMenu";

const Authentication = () => {
  const [openAuth, setOpenAuth] = useState<boolean>(false);
  const { currentUser, SignIn, SignUp, error } = useAuthentication();

  const handleAuth = () => {
    setOpenAuth(!openAuth);
  };

  useEffect(() => {
    setOpenAuth(false);
  }, [currentUser]);

  return (
    <>
      {openAuth ? (
        <>
          <AuthenticationForm
            open={openAuth}
            error={error}
            setOpen={setOpenAuth}
            handleSignIn={SignIn}
            handleSignUp={SignUp}
          />
        </>
      ) : null}
      {currentUser ? <UserMenu /> : <AuthHeader onClick={handleAuth} />}
    </>
  );
};

export default Authentication;