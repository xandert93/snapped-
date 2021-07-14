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
  clearForm,
} from '../../state/authForms/actions';
import { useContext } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';

export default function Auth() {
  const classes = useStyles();
  const { pageName } = useParams();
  const signUpNamesRef = useContext(authContext);

  const dispatch = useDispatch();
  const { showMessage, isSuccess, message } = useSelector(
    (state) => state.authForms.messageData
  );

  useEffect(() => dispatch(clearForm()), [pageName]);

  const submitAuthDetails =
    pageName === 'register'
      ? () => attemptRegister(signUpNamesRef)
      : pageName === 'login'
      ? attemptLogin
      : pageName === 'password-reset'
      ? attemptPasswordReset
      : null;

  const FormControls =
    pageName === 'register'
      ? Register
      : pageName === 'login'
      ? Login
      : pageName === 'password-reset'
      ? ResetPassword
      : null;

  const submitButtonText =
    pageName === 'register'
      ? 'Create Account'
      : pageName === 'login'
      ? 'Login'
      : pageName === 'password-reset'
      ? 'Reset Password'
      : null;

  /* Create Account button disabled=...
      {isSubmitting || activeStep !== steps.length - 1} */

  return (
    <Box className={classes.root}>
      <Paper className={classes.formPaper} elevation={10}>
        <AuthForm submitAuthDetails={submitAuthDetails}>
          <FormControls />
          {showMessage && (
            <AuthMessage isSuccess={isSuccess}>{message}</AuthMessage>
          )}
          <SubmitButton>{submitButtonText}</SubmitButton>
        </AuthForm>
        <RedirectLinks pageName={pageName} />
        <Box className={classes.themeSwitchBox}>
          <ThemeSwitch />
        </Box>
      </Paper>
    </Box>
  );
}
