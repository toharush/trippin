import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState, useRef } from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

interface AuthenticationFormProps {
  open: boolean;
  setOpen: Function;
  handleSignIn: Function;
  handleSignUp: Function;
  error: string | null;
}
const AuthenticationForm = (props: AuthenticationFormProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { open, setOpen, handleSignIn, handleSignUp, error } = props;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleClose = () => setOpen(false);
  const handleChange = () => setIsLogin(!isLogin);
  const handleAuth = () => {
    if (isLogin) {
      handleSignIn(emailRef.current?.value, passwordRef.current?.value);
    } else {
      handleSignUp(emailRef.current?.value, passwordRef.current?.value);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={isLogin}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value={true}>Sign In</ToggleButton>
        <ToggleButton value={false}>Sign Up</ToggleButton>
      </ToggleButtonGroup>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <DialogTitle id="alert-dialog-title">
        {isLogin ? "Welcome back!" : "Sign up for free!"}
      </DialogTitle>
      <DialogContent>
        {isLogin ? (
          <SignIn emailRef={emailRef} passwordRef={passwordRef} />
        ) : (
          <SignUp emailRef={emailRef} passwordRef={passwordRef} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAuth}>{isLogin ? "Sign In" : "Sign Up"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthenticationForm;