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

export const Register = () => {
  const classes = useStyles();
  const { register } = useContext(authContext);
  const [errMsg, setErrMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { push } = useHistory();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const attemptRegister = async (e) => {
    e.preventDefault();
    setErrMsg('');

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (password !== passwordConfirm) {
      setErrMsg('Passwords do not match');
      return;
    }

    try {
      setIsRegistering(true);
      const credToken = await register(email, password);
      await credToken.user.updateProfile({ displayName: username });
      push('/');
    } catch (err) {
      setIsRegistering(false);
      setErrMsg(err.message);
    }
  };

  return (
    <form className="form" onSubmit={attemptRegister}>
      <Typography variant="h4" component="h3" gutterBottom>
        Register
      </Typography>

      <TextField
        className={classes.textField}
        inputRef={usernameRef}
        variant="outlined"
        label="Username"
        required
      />
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
      <TextField
        className={classes.textField}
        inputRef={passwordConfirmRef}
        variant="outlined"
        label="Password"
        type="password"
        required
      />
      {errMsg && <Typography color="error">{errMsg}</Typography>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isRegistering}
      >
        Create New Account
      </Button>
      <Typography>
        Already have account? <Link to="/auth/login">Login</Link>
      </Typography>
    </form>
  );
};
