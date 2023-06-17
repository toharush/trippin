import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import Authentication from "../Authentication/Authentication";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities, useAuthentication, useStepper, useTrip } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";
import Logo from "../../components/Logo/Logo";
import { useState } from "react";
import { stepperValues } from "../../interfaces";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsDateAndTimeValid } from "../../store/selectors/dateAndTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "./SideBar.css";
import MyPlannedTrips from "../../components/MyPlannedTrips/MyPlannedTrips";
import { selectIsDestinationValid } from "../../store";

const SideBarContainer = () => {
  const { currentStep, stepUp, stepDown } = useStepper();
  const { selectedActivities } = useActivities();
  const { createTrip } = useTrip();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const isDateAndTimeValid = useSelector(selectIsDateAndTimeValid);
  const [isPlannedTripOpen, setIsPlannedTripOpen] = useState(false);
  const { currentUser } = useAuthentication();
  const isDestinationValid = useSelector(selectIsDestinationValid);

  const stepper = [
    {
      label: stepperValues[stepperValues.Destination],
      component: (
        <>
          <div className="destination-header">Where are you travelling to?</div>
          <div className="destination-search-wrapper">
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
      stepUp();
    }
  };

  const previous = () => {
    if (0 < currentStep) {
      stepDown();
    }
  };

  const onOpenSavedTrips = () => {
    setIsPlannedTripOpen(true);
  }

  return (
    <>
      <SideBar>
        <>
          <Authentication />
          {(currentUser !== null && !isPlannedTripOpen) && <Button
            className="icon-button saved"
            onClick={onOpenSavedTrips}
            endIcon={<BookmarkAddedIcon />}>
          </Button>}

          {isPlannedTripOpen ?
            <>
              <MyPlannedTrips />
              <Button
                className="icon-button"
                onClick={() => setIsPlannedTripOpen(false)}
                endIcon={<ArrowBackIosIcon />}
              ></Button>
            </> : <>
              {stepper[currentStep].component}
              <div className="container">
                {currentStep > 0 && (
                  <Button
                    className="icon-button"
                    onClick={previous}
                    endIcon={<ArrowBackIosIcon />}
                  ></Button>
                )}
                <div className="spacer" />
                <Button
                  className="icon-button next"
                  onClick={next}
                  disabled={!isDateAndTimeValid || !isDestinationValid }
                  endIcon={<ArrowForwardIosIcon />}
                ></Button>
              </div>
              <div className="spacer" />
              <AppStepper
                labels={stepper.map((step) => step.label)}
                activeStep={currentStep}
              />
            </>}
          <Logo />
        </>
      </SideBar>
    </>
  );
};

export default SideBarContainer;
