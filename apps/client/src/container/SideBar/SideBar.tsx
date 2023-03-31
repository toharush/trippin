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

  const stepper = [
    {
      label: "test",
      component: (
        <>
          <AuthHeader />
          <TravelsCategoryComponent />
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
    {
      label: "test2",
      component: (
        <>
          <AuthHeader />
          <TravelsCategoryComponent />
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
    {
      label: "test2",
    }
  ];

  return (
    <>
      <SideBar
        ChildComponent={
          <>
            {stepper[0].component}
            <AppStepper labels={stepper.map(step => step.label)} />
          </>
        }
      />
      {isActivitiesOpen ? <ActivitiesSidebarComponent /> : null}
    </>
  );
};

export default SideBarContainer;
