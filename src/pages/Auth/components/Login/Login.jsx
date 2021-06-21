import { TextField, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { authFormsContext } from '../../../../contexts/4.authForms/authFormsContext';
import useStyles from './styles';

const Login = () => {
  const classes = useStyles();

  const { email, password, changeHandler, msgData, isSubmitting } =
    useContext(authFormsContext);

  return (
    <>
      <TextField
        type="email"
        name="email"
        label="Email address"
        value={email}
        onChange={changeHandler}
        required
      />

      <TextField
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={changeHandler}
        required
      />

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
        Log In
      </Button>
    </>
  );
};

export default Login;
