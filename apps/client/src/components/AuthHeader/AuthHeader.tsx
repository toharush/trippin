import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AuthHeader.css";

interface AuthHeaderProps {
  onClick: Function;
  userName: string | null | undefined;
}
const AuthHeader = (props: AuthHeaderProps) => {
  const { onClick, userName } = props;

  const handleOnClick = () => onClick();

  return (
    <Box className="sidebar-login" onClick={handleOnClick}>
      <AccountCircleIcon className="sidebar-icon" />
      <text className="sidebar-text">{userName ? userName : "Login"}</text>
    </Box>
  );
};

export default AuthHeader;
