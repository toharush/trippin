import { useState } from "react";
import ActivitiesSidebarComponent from "../../components/ActivitiesSidebarComponent/ActivitiesSidebarComponent";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Logo from "../../components/Logo/Logo";
import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities } from "../../hooks";

const SideBarContainer = () => {
  const { selectedActivities } = useActivities();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

  return (
    <>
      <SideBar
        ChildComponent={
          <>
            <AuthHeader />
            <TravelsCategoryComponent />
            <Dropdown
              handleClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
              isCategoryOpen={isActivitiesOpen}
              title="Selected Activities"
            />
            {isActivitiesOpen ? (
              <ActivitiesGallery selectedActivities={selectedActivities} max={1} />
            ) : null}
            <Logo />
          </>
        }
      />
      {isActivitiesOpen ? <ActivitiesSidebarComponent /> : null}
    </>
  );
};

export default SideBarContainer;
