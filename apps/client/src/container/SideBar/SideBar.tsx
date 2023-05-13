import { useState } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities, useMapDrawer, useStepper } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";
import { stepperValues } from "../../interfaces";
import { Button } from "@mui/material";
import DaysNavigation from "../../components/DaysNavigation/DaysNavigation";
import DayRoute from "../../components/DayRoute/DayRoute";

const SideBarContainer = () => {
  const { currentStep, stepUp, stepDown } = useStepper();
  const { selectedActivities } = useActivities();
  const { selectedDayRoutes } = useMapDrawer();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const stepper = [
    {
      label: stepperValues[stepperValues.Location],
      component: (
        <>
          <AuthHeader />
        </>
      ),
    },
    {
      label: stepperValues[stepperValues.Activities],
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
            <ActivitiesGallery selectedActivities={selectedActivities} />
          ) : null}
        </>
      ),
    },
    {
      label: stepperValues[stepperValues.Results],
      component: (
        <>
          <AuthHeader></AuthHeader>
          <DaysNavigation selectedDayRoutes={selectedDayRoutes}></DaysNavigation>
        </>
      )
    }
  ];

  const next = () => {
    if (stepper.length > currentStep + 1) {
      stepUp();
    }
  };

  const previous = () => {
    if (0 < currentStep) {
      stepDown();
    }
  };

  return (
    <>
      <SideBar>
        <>
          {stepper[currentStep].component}
          <AppStepper
            labels={stepper.map((step) => step.label)}
            activeStep={currentStep}
          />
          <Button onClick={previous}>previous</Button>
          <Button onClick={next}>Next</Button>
        </>
      </SideBar>
    </>
  );
};

export default SideBarContainer;
