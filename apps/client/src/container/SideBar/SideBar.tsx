import { useState } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities, useStepper } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";
import useMapDrawer from "../../hooks/useMapDrawer";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import { stepperValues } from "../../interfaces";
import { Button } from "@mui/material";
import Authentication from "../Authentication/Authentication";

const SideBarContainer = () => {
  const { currentStep, stepUp, stepDown } = useStepper();
  const { selectedActivities } = useActivities();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const stepper = [
    {
      label: stepperValues[stepperValues.Location],
      component: 
      <>
        <DateRangePicker />
      </>,
    },
    {
      label: stepperValues[stepperValues.Activities],
      component: (
        <>
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
          <Authentication />
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
