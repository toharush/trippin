import { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import { stepperValues } from "../../interfaces";
import { Button } from "@mui/material";
import Authentication from "../Authentication/Authentication";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./SideBar.css";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";

const SideBarContainer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { selectedActivities } = useActivities();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  const stepper = [
    {
      label: stepperValues[stepperValues.Location],
      component: (
        <>
          <div style={{marginLeft: "5%", marginRight: "11%"}}>
            <DestintionsSearch />
          </div>
          <DateRangePicker />
        </>
      ),
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
      setCurrentStep(currentStep + 1);
    }
  };

  const previous = () => {
    if (0 < currentStep) {
      setCurrentStep(currentStep - 1);
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
          <div className="container">
            <ArrowBackIosIcon className="i" onClick={previous}>
              previous
            </ArrowBackIosIcon>
            <ArrowForwardIosIcon className="i" onClick={next}>
              Next
            </ArrowForwardIosIcon>
          </div>
        </>
      </SideBar>
    </>
  );
};

export default SideBarContainer;
