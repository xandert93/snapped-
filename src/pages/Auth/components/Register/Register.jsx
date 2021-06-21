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
import { useContext } from 'react';
import { authFormsContext } from '../../../../contexts/4.authForms/authFormsContext';
import useStyles from './styles';

const steps = [
  'Provide your full name',
  'Provide a unique username',
  'Provide a unique email',
  'Provide a secure password',
];

const Register = () => {
  const classes = useStyles();

  const {
    username,
    fullName,
    email,
    password,
    passwordConfirm,
    changeHandler,
    msgData,
    isSubmitting,
  } = useContext(authFormsContext);

  const [activeStep, setActiveStep] = useState(0);

  const stepContent = [
    { type: 'text', name: 'fullName', label: 'Full Name', value: fullName },
    {
      type: 'text',
      name: 'username',
      label: 'Username',
      value: username,
      helperText: 'This can never be changed.',
    },
    { type: 'email', name: 'email', label: 'Email address', value: email },
    [
      {
        type: 'password',
        name: 'password',
        label: 'Password',
        value: password,
      },
      {
        type: 'password',
        name: 'passwordConfirm',
        label: 'Password',
        value: passwordConfirm,
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
              {idx < stepContent.length - 1 ? (
                <TextField
                  {...stepContent[idx]}
                  onChange={changeHandler}
                  required
                />
              ) : (
                <Box className={classes.stepperFields}>
                  <TextField
                    {...stepContent[idx][0]}
                    onChange={changeHandler}
                    required
                  />
                  <TextField
                    {...stepContent[idx][1]}
                    onChange={changeHandler}
                    required
                  />
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
        Create Account
      </Button>
    </>
  );
};

export default Register;
