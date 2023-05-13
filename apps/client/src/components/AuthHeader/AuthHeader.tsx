import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AuthHeader.css";
import SharedContact from "../UserMenuComponent/UserMenuComponent";
import { Avatar } from "@mui/material";

interface AuthHeaderProps {
  onClick: Function;
}
const AuthHeader = (props: AuthHeaderProps) => {
  const { onClick } = props;

  const handleOnClick = () => {
    onClick();
  };

  return (
    <Box className="sidebar-login" onClick={handleOnClick}>
      <AccountCircleIcon className="sidebar-icon" />
      <text className="sidebar-text">Login</text>
    </Box>
  );
};

export default AuthHeader;
