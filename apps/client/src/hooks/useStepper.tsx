import { useSelector } from "react-redux";
import { selectCurrentStep, useAppDispatch } from "../store";
import { setStepper } from "../store/slices/stepper";

const useStepper = () => {
  const dispatch = useAppDispatch();
  const currentStep = useSelector(selectCurrentStep);

  const stepUp = () => {
    dispatch(setStepper(currentStep + 1))
  };
  const stepDown = () => {
    dispatch(setStepper(currentStep - 1))
  };

  const setStep = (index: number) => {
    dispatch(setStepper(index));
  }

  return {
    currentStep,
    stepUp,
    stepDown,
    setStep
  };
};

export default useStepper;
