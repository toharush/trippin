import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMapDrawer } from '../../hooks';
import { createTheme, ThemeProvider } from '@mui/material';
import { DayRoute } from '../../interfaces/dayRoute/dayRoute';

interface props {
    dayRoute: DayRoute,
    activeStep: number,
    handleNext: ()=>void,
    handleBack: ()=>void,
    handleReset: ()=>void,
}

 const DayRouteComponent =({dayRoute, activeStep,handleNext,handleBack,handleReset}: props)=> {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#86eaf0',
      },
      action: {
        hover: 'rgba(0, 0, 0, .2)',
      },
      text: {
        primary:"#FFFFFF",
        secondary:"#FFFFFF",
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ maxWidth: 400, margin:"8%"}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {dayRoute?.route.map((step, index) => (
          <Step key={step.id}>
            <StepLabel>{step.name}</StepLabel>
            <StepContent>
              <Typography>{step.location}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === dayRoute.route.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === dayRoute?.route.length && (
        <>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </>
      )}
    </Box>
    </ThemeProvider>
  );
}

export default DayRouteComponent;