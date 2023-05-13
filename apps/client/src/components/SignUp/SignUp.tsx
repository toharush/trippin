import { TextField } from "@mui/material";

interface SignUpProps {
  emailRef: React.RefObject<HTMLInputElement> | undefined;
  passwordRef: React.RefObject<HTMLInputElement> | undefined;
}
const SignUp = (props: SignUpProps) => {
  const { emailRef, passwordRef } = props;
  
  return (
    <>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="dense"
        inputRef={emailRef}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="dense"
        inputRef={passwordRef}
      />
    </>
  );
};

export default SignUp;
