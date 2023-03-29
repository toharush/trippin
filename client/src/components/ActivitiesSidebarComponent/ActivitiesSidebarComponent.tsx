import Box from "@mui/material/Box";
import SearchComponent from "../SearchComponent/SearchComponent";
import "./ActivitiesSidebarComponent.css";

export default function ActivitiesSidebarComponent() {
  return (
    <Box className="sidebar">
      <SearchComponent title="Search for activities"></SearchComponent>
    </Box>
  );
}
