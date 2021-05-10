import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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

export const PasswordReset = () => {
  const classes = useStyles();
  const { resetPassword } = useContext(authContext);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);

  const emailRef = useRef();

  const attemptReset = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setIsSendingResetEmail(true);
    const email = emailRef.current.value;

    try {
      await resetPassword(email);
      setSuccessMsg('Please check your inbox for further instructions.');
    } catch (err) {
      setIsSendingResetEmail(false);
      setErrMsg('This email add is not on our database');
    }
  };

  return (
    <form className="form" onSubmit={attemptReset}>
      <Typography variant="h4" component="h3" gutterBottom>
        Reset Your Password
      </Typography>
      <TextField
        className={classes.textField}
        inputRef={emailRef}
        variant="outlined"
        label="Email address"
        type="email"
        required
      />
      {errMsg && <Typography color="error">{errMsg}</Typography>}
      {successMsg && <Typography color="primary">{successMsg}</Typography>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSendingResetEmail}
      >
        Reset Password
      </Button>

      <Typography>
        Already have account? <Link to="/auth/login">Login</Link>
      </Typography>
    </form>
  );
};
