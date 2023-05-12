import { RootState } from "../store";

export const selectCurrentStep = (state: RootState): number =>
  state.stepper.currentStep;
