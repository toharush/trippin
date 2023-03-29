import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TravelsCategoryComponent from "../TravelsCategoryComponent/TravelsCategoryComponent";
import SelectedActivitiesComponent from "../SelectedActivitiesComponent/SelectedActivitiesComponent";
import "./SideBar.css";

interface props {
  handleActivityClick: () => void;
}

export default function SideBar({ handleActivityClick }: props) {
  return (
    <Box className="main-sidebar">
      <Box className="sidebar-login">
        <AccountCircleIcon className="sidebar-icon"></AccountCircleIcon>
        <text className="sidebar-text">Login</text>
      </Box>
      <TravelsCategoryComponent></TravelsCategoryComponent>
      <SelectedActivitiesComponent
        handleActivityClick={handleActivityClick}
      ></SelectedActivitiesComponent>
      <Box className="sidebar-logo">
        <img src="logo.png" className="sidebar-img"></img>
      </Box>
    </Box>
  );
}
