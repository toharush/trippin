import { useState } from "react";
import ActivitiesSidebarComponent from "../../components/ActivitiesSidebarComponent/ActivitiesSidebarComponent";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";

const SideBarContainer = () => {
  const { selectedActivities } = useActivities();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const stepper = [
    {
      label: "Categories",
      component: (
        <>
          <AuthHeader />
          <TravelsCategoryComponent
            isCategoriesOpen={isCategoriesOpen}
            setIsCategoriesOpen={() => setIsCategoriesOpen(!isCategoriesOpen)}
          />
          <Dropdown
            handleClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
            isCategoryOpen={isActivitiesOpen}
            title="Selected Activities"
          />
          {isActivitiesOpen ? (
            <ActivitiesGallery
              selectedActivities={selectedActivities}
              max={1}
            />
          ) : null}
        </>
      ),
    },
  ];

  return (
    <>
      <SideBar
        ChildComponent={
          <>
            {stepper[0].component}
            <AppStepper labels={stepper.map((step) => step.label)} />
          </>
        }
      />
      {isActivitiesOpen ? <ActivitiesSidebarComponent /> : null}
    </>
  );
};

export default SideBarContainer;
