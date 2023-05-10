import { Step, StepIcon, StepLabel, Stepper } from "@mui/material";
import Logo from "../Logo/Logo";
import "./Stepper.css";

interface StepperProps {
  labels: string[];
  activeStep: number;
}

const AppStepper = ({ labels, activeStep }: StepperProps) => {
  return (
    <div className="stepper-bottom">
      <Stepper activeStep={activeStep} alternativeLabel>
        {labels.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        <Step key={"logo"}>
          <StepLabel icon={<Logo />} />
        </Step>
      </Stepper>
    </div>
  );
};

export default AppStepper;
