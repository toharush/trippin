import { Step, StepIcon, StepLabel, Stepper } from "@mui/material";
import Logo from "../Logo/Logo";
import "./Stepper.css";

interface StepperProps {
  labels: string[];
  activeStep: number;
}

const AppStepper = ({ labels, activeStep }: StepperProps) => {
  return (
      <Stepper activeStep={activeStep} alternativeLabel>
        {labels.map((label, index) => (
          <Step key={label}>
            <StepLabel className="label">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
};

export default AppStepper;