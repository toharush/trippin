import SideBar from "../../components/SideBar/SideBar";
import TravelsCategoryComponent from "../../components/TravelsCategoryComponent/TravelsCategoryComponent";
import Dropdown from "../../components/Dropdown/Dropdown";
import ActivitiesGallery from "../../components/ActivitiesGallery/ActivitiesGallery";
import { useActivities, useMapDrawer, useStepper, useTrip } from "../../hooks";
import AppStepper from "../../components/Stepper/Stepper";
import DestintionsSearch from "../DestinationsSearch/DestinationsSearch";
import Logo from "../../components/Logo/Logo";
import { useState } from "react";
import { stepperValues } from "../../interfaces";
import { Button } from "@mui/material";
import DaysNavigation from "../../components/DaysNavigation/DaysNavigation";
import { useSelector } from "react-redux";
import { selectIsDateAndTimeValid } from "../../store/selectors/dateAndTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./SideBar.css";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";
import Authentication from "../Authentication/Authentication";

const SideBarContainer = () => {
  const { currentStep, stepUp, stepDown } = useStepper();
  const { selectedActivities } = useActivities();
  const { selectedDayRoutes } = useMapDrawer();
  const { createTrip } = useTrip();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const isDateAndTimeValid = useSelector(selectIsDateAndTimeValid);

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
          <Authentication />
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
              disabled={!isDateAndTimeValid}
              endIcon={<ArrowForwardIosIcon />}
            ></Button>
          </div>
          <div className="spacer" />
          <AppStepper
            labels={stepper.map((step) => step.label)}
            activeStep={currentStep}
          />
          <Logo />
        </>
      </SideBar>
    </>
  );
};

export default SideBarContainer;
