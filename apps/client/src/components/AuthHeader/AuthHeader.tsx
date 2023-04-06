import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AuthHeader.css";

interface AuthHeaderProps {
  isLogin?: boolean;
}
const AuthHeader = ({ isLogin }: AuthHeaderProps) => {
  if (isLogin) {
    return <div>Hey</div>;
  } else {
    return (
      <Box className="sidebar-login">
        <AccountCircleIcon className="sidebar-icon" />
        <text className="sidebar-text">Login</text>
      </Box>
    );
  }
};

export default AuthHeader;
