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
    <Box className="sidebar-login">
      <div
        style={{
          display: "flex",
          maxWidth: "100px",
          width: "10px",
          cursor: "pointer",
          alignItems: "center"
        }}
        onClick={handleOnClick}
      >
        <AccountCircleIcon className="sidebar-icon" />
        <span className="username">{title ? title : "Login"}</span>
      </div>
    </Box>
  );
};

export default AuthHeader;
