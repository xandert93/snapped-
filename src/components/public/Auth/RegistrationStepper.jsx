import {
  Box,
  Button,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import React, { useState } from 'react';
import useStyles from './styles';

const steps = [
  'Provide a unique username',
  'Provide a unique email',
  'Provide a secure password',
];

const RegisterForm = ({ refs, submitBtnText, msgData, isSubmitting }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const stepContent = [
    { inputRef: refs.usernameRef, type: 'text', label: 'Username' },
    { inputRef: refs.emailRef, type: 'email', label: 'Email address' },
    [
      { inputRef: refs.passwordRef, type: 'password', label: 'Password' },
      {
        inputRef: refs.passwordConfirmRef,
        type: 'password',
        label: 'Password',
        helperText: 'Please confirm your password.',
      },
    ],
  ];

  return (
    <>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={classes.stepper}>
        {steps.map((stepName, idx) => (
          <Step key={stepName}>
            <StepLabel>{stepName}</StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }}>
              {idx < 2 ? (
                <TextField {...stepContent[idx]} required />
              ) : (
                <Box className={classes.stepperFields}>
                  <TextField {...stepContent[idx][0]} required />
                  <TextField {...stepContent[idx][1]} required />
                </Box>
              )}
              <Box className={classes.actionBtns}>
                <IconButton
                  onClick={() => setActiveStep(activeStep - 1)}
                  disabled={activeStep === 0}>
                  <ArrowUpward />
                </IconButton>
                <IconButton
                  onClick={() => setActiveStep(activeStep + 1)}
                  disabled={activeStep === steps.length - 1}>
                  <ArrowDownward />
                </IconButton>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {msgData && (
        <Typography color={`${msgData.success ? 'primary' : 'error'}`}>
          {msgData.msg}
        </Typography>
      )}
      <Button
        className={classes.btnSubmit}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting || activeStep !== steps.length - 1}>
        {submitBtnText}
      </Button>
    </>
  );
};

export default RegisterForm;
