import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { User } from "firebase/auth";

interface ProfileProps {
  user: User;
}

const Profile = (props: ProfileProps) => {
  const { email } = props.user;

  return (
    <>
      <DialogContent>
        <Avatar>{email![0]}</Avatar>
        <TextField
          type="email"
          value={email}
          label="email"
          disabled
          margin="dense"
          fullWidth
        />
        <TextField type="password" label="password" margin="dense" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {}}>Update</Button>
      </DialogActions>
    </>
  );
};

export default Profile;
