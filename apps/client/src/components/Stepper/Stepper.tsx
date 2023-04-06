import { Step, StepIcon, StepLabel, Stepper } from "@mui/material";
import Logo from "../Logo/Logo";
import "./Stepper.css";

interface StepperProps {
  labels: string[];
}

const AppStepper = ({ labels }: StepperProps) => {
  return (
    <div className="stepper-bottom">
      <Stepper activeStep={1} alternativeLabel>
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
