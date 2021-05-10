import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import authContext from '../../contexts/auth/authContext';

const useStyles = makeStyles({
  form: {
    maxWidth: '30rem',
  },
  textField: {
    marginBottom: '16px',
    display: 'block',
  },
});

export const Login = () => {
  const classes = useStyles();
  const { login } = useContext(authContext);
  const { push } = useHistory();
  const [errMsg, setErrMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const attemptLogin = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setIsLoggingIn(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);

    try {
      await login(email, password);
      push('/');
    } catch (err) {
      setIsLoggingIn(false);
      setErrMsg(err.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={attemptLogin}>
      <Typography variant="h4" component="h3" gutterBottom>
        Login
      </Typography>

      <TextField
        className={classes.textField}
        inputRef={emailRef}
        variant="outlined"
        label="Email address"
        type="email"
        required
      />
      <TextField
        className={classes.textField}
        inputRef={passwordRef}
        variant="outlined"
        label="Password"
        type="password"
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoggingIn}
      >
        Log In
      </Button>

      <Typography color="error">{errMsg}</Typography>
      <Typography>
        Forgotten Password?{' '}
        <Link to="/auth/password-reset">Reset Password</Link>
      </Typography>
      <Typography>
        No account? <Link to="/auth/register">Create New Account</Link>
      </Typography>
    </form>
  );
};
