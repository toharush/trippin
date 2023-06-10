import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StepperState {
  currentStep: number;
}

const initialState: StepperState = {
  currentStep: 0,
};

const stores = createSlice({
  name: "stepper",
  initialState: initialState,
  reducers: {
    setStepper: (state, action: PayloadAction<number>) => ({
      ...state,
      currentStep: action.payload,
    }),
  },
});

export const { setStepper } = stores.actions;
export default stores.reducer;
