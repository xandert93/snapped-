import { TextField, Button, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const LoginControls = ({
  userAction,
  refs,
  msgData,
  isSubmitting,
  submitBtnText,
}) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        inputRef={refs.emailRef}
        label="Email address"
        type="email"
        required
      />
      {userAction !== 'password-reset' && (
        <TextField
          inputRef={refs.passwordRef}
          label="Password"
          type="password"
          required
        />
      )}

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
        disabled={isSubmitting}>
        {submitBtnText}
      </Button>
    </>
  );
};

export default LoginControls;
