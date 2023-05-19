import { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities, useStepper } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";
import { stepperValues } from "../../interfaces";
import { Button } from "@mui/material";
import Authentication from "../Authentication/Authentication";
import MyTrips from "../MyTrips/MyTrips";

const SideBarContainer = () => {
  const { currentStep, stepUp, stepDown, setStep } = useStepper();
  const { selectedActivities } = useActivities();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const onSelectTrip = () => {
    setStep(stepperValues.Activities);
  };

  const stepper = [
    {
      label: stepperValues[stepperValues["My Trips"]],
      component: <MyTrips onSelectTrip={onSelectTrip} />,
    },
    {
      label: stepperValues[stepperValues.Location],
      component: <></>,
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
            onSelect={(index) => setStep(index)}
          />
          <Button onClick={previous}>previous</Button>
          <Button onClick={next}>Next</Button>
        </>
      </SideBar>
    </>
  );
};

export default SideBarContainer;
