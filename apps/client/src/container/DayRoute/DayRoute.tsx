import React from "react";
import DayRouteComponent from "../../components/DayRoute/DayRoute";
import { DayRoute } from "../../interfaces/dayRoute/dayRoute";

interface props {
    dayRoute: DayRoute,
}

const DayRouteContainer =({dayRoute}: props)=> {
    const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <DayRouteComponent dayRoute={dayRoute} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} handleReset={handleReset}></DayRouteComponent>
  )

}

export default DayRouteContainer;