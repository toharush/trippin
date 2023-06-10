import { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities, useAuthentication, useTrip } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import { stepperValues } from "../../interfaces";
import { Button } from "@mui/material";
import Authentication from "../Authentication/Authentication";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "./SideBar.css";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";

const SideBarContainer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { selectedActivities } = useActivities();
  const { createTrip } = useTrip();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isPlannedTripOpen, setIsPlannedTripOpen] = useState(false);
  const {currentUser} = useAuthentication();

  const stepper = [
    {
      label: stepperValues[stepperValues.Location],
      component: (
        <>
          <div style={{ marginLeft: "5%", marginRight: "11%" }}>
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
          <Button onClick={createTrip}>Calculate Trip</Button>
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

  const onOpenSavedTrips = () => {
    setIsPlannedTripOpen(true);
  }

  return (
    <>
      <SideBar>
        <>
          <div className="row">
            <Authentication/>
            {(currentUser !== null) && <Button
              className="icon-button saved"
              onClick={onOpenSavedTrips}
              endIcon={<BookmarkAddedIcon />}>
            </Button>}
          </div>
          {isPlannedTripOpen ? <div/> : 
          <> 
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
          </>}
        </>
      </SideBar>
    </>
  );
};

export default SideBarContainer;
