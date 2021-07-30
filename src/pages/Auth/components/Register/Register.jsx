import {
  Box,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../../../../state/authForms/selectors';
import AuthTextField from '../AuthTextField';
import useStyles from './styles';

const steps = [
  'Provide your full name',
  'Provide a unique username',
  'Provide a unique email',
  'Provide a secure password',
];

export default function Register() {
  const classes = useStyles();

  const { username, fullName, email, password, passwordConfirm } =
    useSelector(userDetailsSelector);

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
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      className={classes.stepper}>
      {steps.map((stepName, idx) => (
        <Step key={stepName}>
          <StepLabel>{stepName}</StepLabel>
          <StepContent TransitionProps={{ unmountOnExit: false }}>
            {idx < stepContent.length - 1 ? (
              <AuthTextField {...stepContent[idx]} />
            ) : (
              <Box className={classes.stepperFields}>
                <AuthTextField {...stepContent[idx][0]} />
                <AuthTextField {...stepContent[idx][1]} />
              </Box>
            )}
            <Box className={classes.actionButtons}>
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
  );
}
