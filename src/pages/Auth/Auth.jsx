import { Box, Paper, Typography } from '@material-ui/core';
import React, { useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authContext } from '../../contexts/1.auth/authContext';
import useStyles from './styles';
import logo from '../../assets/images/snapped.ico';
import { useForm } from '../../custom-hooks';
import {
  LoginControls,
  RedirectLinks,
  RegistrationStepper,
} from './components';

import { checkUsernameTaken } from '../../services/firebase';
import { ThemeSwitch } from '../../components';
// import RedirectLinks from './RedirectLinks/RedirectLinks';

export default function Auth() {
  const classes = useStyles();
  const { userAction } = useParams();

  const { register, login, resetPassword } = useContext(authContext);
  const { msgData, setMsgData, isSubmitting, setIsSubmitting, refs } =
    useForm();

  const resetMountedFields = useCallback(() => {
    setMsgData(null);
    setIsSubmitting(false);
    [refs.emailRef, refs.passwordRef].forEach((ref) => {
      if (ref.current) ref.current.value = '';
    });
  }, []);

  useEffect(resetMountedFields, [userAction]);

  let submitBtnText =
    userAction === 'register'
      ? 'Create Account'
      : userAction === 'password-reset'
      ? 'Reset Password'
      : 'Log In';

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      setMsgData(null);
      setIsSubmitting(true);
      const email = refs.emailRef.current.value;

      if (userAction === 'register') attemptRegister(email);
      if (userAction === 'login') attemptLogin(email);
      if (userAction === 'password-reset') attemptPasswordReset(email);
    },
    [userAction]
  );

  const attemptRegister = useCallback(async (email) => {
    const username = refs.usernameRef.current.value;
    const fullName = refs.fullNameRef.current.value;
    const password = refs.passwordRef.current.value;
    const passwordConfirm = refs.passwordConfirmRef.current.value;

    if (username.length < 4) {
      setIsSubmitting(false);
      return setMsgData({
        success: false,
        msg: 'Username must be at least 5 characters.',
      });
    }

    if (password !== passwordConfirm) {
      setIsSubmitting(false);
      return setMsgData({ success: false, msg: 'Passwords do not match.' });
    }

    //Wouldn't allow 3 word names
    // if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName)) {
    //   setIsSubmitting(false);
    //   return setMsgData({ success: false, msg: 'Please enter a valid name.' });
    // }

    if (await checkUsernameTaken(username)) {
      setIsSubmitting(false);
      return setMsgData({
        success: false,
        msg: 'That username is already taken.',
      });
    }

    try {
      await register(email, password, username, fullName);
    } catch (err) {
      setIsSubmitting(false);
      return setMsgData({ success: false, msg: err.message });
    }
  }, []);

  const attemptLogin = useCallback(async (email) => {
    const password = refs.passwordRef.current.value;
    try {
      await login(email, password);
    } catch (err) {
      setIsSubmitting(false);
      setMsgData({ success: false, msg: err.message });
    }
  }, []);

  const attemptPasswordReset = useCallback(async (email) => {
    try {
      await resetPassword(email);
      setMsgData({
        success: true,
        msg: 'Please check your inbox for further instructions.',
      });
    } catch (err) {
      setIsSubmitting(false);
      return setMsgData({
        success: false,
        msg: 'This email address is not on our database.',
      });
    }
  }, []);

  return (
    <div className={classes.layout}>
      <Paper className={classes.formPaper} elevation={10}>
        <form className={classes.form} onSubmit={submitHandler}>
          <Box>
            <img src={logo} alt="snapped!" className={classes.logoImg} />
          </Box>
          <Typography variant="h4" component="h1">
            snapped!
          </Typography>

          {userAction === 'register' ? (
            <RegistrationStepper
              {...{ refs, submitBtnText, isSubmitting, msgData }}
            />
          ) : (
            <LoginControls
              {...{ userAction, refs, submitBtnText, isSubmitting, msgData }}
            />
          )}
          <Box className={classes.themeSwitchBox}>
            <ThemeSwitch />
          </Box>
        </form>
        <RedirectLinks {...{ userAction }} />
      </Paper>
    </div>
  );
}
