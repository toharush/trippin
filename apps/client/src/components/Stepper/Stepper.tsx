import { Step, StepIcon, StepLabel, Stepper } from "@mui/material";
import Logo from "../Logo/Logo";
import "./Stepper.css";

interface StepperProps {
  labels: string[];
  activeStep: number;
  onSelect: (index: number) => void;
}

const AppStepper = ({ labels, activeStep, onSelect }: StepperProps) => {
  return (
    <div className="stepper-bottom">
      <Stepper activeStep={activeStep} alternativeLabel>
        {labels.map((label, index) => (
          <Step key={label} onClick={() => onSelect(index)}>
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
