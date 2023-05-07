import Box from "@mui/material/Box";
import DestintionsSearch from "../../container/DestinationsSearch/DestinationsSearch";
import SearchComponent from "../SearchComponent/SearchComponent";
import "./ActivitiesSidebarComponent.css";

export default function ActivitiesSidebarComponent() {
  return (
    <Box className="sidebar">
      {/* <SearchComponent title="Search for activities" searchingDests={false}/> */}
      <DestintionsSearch title="Search for activities" searchingDests={false}></DestintionsSearch>
    </Box>
  );
}
