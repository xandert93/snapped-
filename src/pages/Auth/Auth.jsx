import { Box, Paper } from '@material-ui/core';
import useStyles from './styles';

import {
  AuthForm,
  Login,
  Register,
  ResetPassword,
  RedirectLinks,
  AuthMessage,
  SubmitButton,
} from './components';
import { ThemeSwitch } from '../../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  attemptLogin,
  attemptPasswordReset,
  attemptRegister,
  clearAuthForm,
} from '../../state/authForms/actions';

const authLookup = {
  register: {
    FormControls: Register,
    submitHandler: attemptRegister,
    submitText: 'Create Account',
  },
  login: {
    FormControls: Login,
    submitHandler: attemptLogin,
    submitText: 'Login',
  },
  'password-reset': {
    FormControls: ResetPassword,
    submitHandler: attemptPasswordReset,
    submitText: 'Reset Password',
  },
};

export default function Auth() {
  const classes = useStyles();
  const { pageName } = useParams();

  const { FormControls, submitHandler, submitText } = authLookup[pageName];

  const dispatch = useDispatch();
  const { showMessage, isSuccess, message } = useSelector(
    (state) => state.authForms.messageData
  );

  useEffect(() => dispatch(clearAuthForm()), [pageName]);

  /* Create Account button disabled=...
      {isSubmitting || activeStep !== steps.length - 1} */

  return (
    <Box className={classes.root}>
      <Paper className={classes.formPaper} elevation={10}>
        <AuthForm submitHandler={submitHandler}>
          <FormControls />
          {showMessage && (
            <AuthMessage isSuccess={isSuccess}>{message}</AuthMessage>
          )}
          <SubmitButton>{submitText}</SubmitButton>
        </AuthForm>
        <RedirectLinks pageName={pageName} />
        <Box className={classes.themeSwitchBox}>
          <ThemeSwitch />
        </Box>
      </Paper>
    </Box>
  );
}
