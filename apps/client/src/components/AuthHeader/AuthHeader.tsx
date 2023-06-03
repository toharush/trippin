import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./AuthHeader.css";

interface AuthHeaderProps {
  onClick?: Function;
  title?: string;
}
const AuthHeader = (props: AuthHeaderProps) => {
  const { onClick, title } = props;

  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Box className="sidebar-login" onClick={handleOnClick}>
      <AccountCircleIcon className="sidebar-icon" />
      <span className="sidebar-text">{title ? title : "Login"}</span>
    </Box>
  );
};

export default AuthHeader;
