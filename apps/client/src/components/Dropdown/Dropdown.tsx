import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./Dropdown.css";

interface props {
  handleClick: () => void;
  isCategoryOpen: boolean;
  title: string;
}

export default function Dropdown({
  handleClick,
  isCategoryOpen,
  title,
}: props) {
  return (
    <Box className="dropdown-root" onClick={handleClick}>
      {!isCategoryOpen && <KeyboardArrowRightIcon></KeyboardArrowRightIcon>}
      {isCategoryOpen && <KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
      <text className="dropdown-title">{title}</text>
    </Box>
  );
}
