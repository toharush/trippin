import Box from "@mui/material/Box";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import ActivitiesGallery from "../ActivitiesGallery/ActivitiesGallery";

interface props {
  handleActivityClick: () => void;
}

export default function SelectedActivitiesComponent({
  handleActivityClick,
}: props) {
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

  const handleActivitiesClick = () => {
    setIsActivitiesOpen(!isActivitiesOpen);
    handleActivityClick();
  };

  const activitiesTitle = "Selected Activities";

  return (
    <Box>
      <Dropdown
        handleClick={handleActivitiesClick}
        isCategoryOpen={isActivitiesOpen}
        title={activitiesTitle}
      ></Dropdown>
      {isActivitiesOpen && <ActivitiesGallery></ActivitiesGallery>}
    </Box>
  );
}
