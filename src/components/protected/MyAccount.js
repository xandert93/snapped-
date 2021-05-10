import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import authContext from '../../contexts/auth/authContext';

const useStyles = makeStyles({
  form: {
    maxWidth: '30rem',
  },
  textField: {
    marginBottom: '16px',
    display: 'block',
    '&:first-child': {
      marginTop: 30,
    },
  },
});

const MyAccount = () => {
  const classes = useStyles();
  const {
    currentUser,
    updateEmail,
    updatePassword,
    updateProfileData,
  } = useContext(authContext);

  const [errMsg, setErrMsg] = useState('');
  //inefficient - make into a single message
  const [successMsg, setSuccessMsg] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const attemptUpdate = async (e) => {
    e.preventDefault();
    setErrMsg('');
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (password != passwordConfirm) {
      return setErrMsg('two entered Passwords no matcheez');
    }

    const promises = [];
    if (username !== currentUser.displayName)
      promises.push(updateProfileData({ displayName: username }));
    if (email !== currentUser.email) promises.push(updateEmail(email));
    if (password && password !== currentUser.password)
      promises.push(updatePassword(password));

    try {
      setIsUpdating(true);
      await Promise.all(promises).finally(() => setIsUpdating(false));
      setSuccessMsg('details updated');
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <form onSubmit={attemptUpdate}>
      {successMsg && <Typography color="primary">{successMsg}</Typography>}

      <TextField
        className={classes.textField}
        inputRef={usernameRef}
        variant="outlined"
        label="Username"
        defaultValue={currentUser.displayName}
        required
      />
      <TextField
        className={classes.textField}
        inputRef={emailRef}
        variant="outlined"
        label="Email address"
        defaultValue={currentUser.email}
        type="email"
        required
      />
      <TextField
        className={classes.textField}
        inputRef={passwordRef}
        variant="outlined"
        label="Password"
        type="password"
        helperText="Please leave blank to keep the same."
      />
      <TextField
        className={classes.textField}
        inputRef={passwordConfirmRef}
        variant="outlined"
        label="Password"
        type="password"
        helperText="Please leave blank to keep the same."
      />
      {errMsg && <Typography color="error">{errMsg}</Typography>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isUpdating}
      >
        Update Details
      </Button>
    </form>
  );
};

export default MyAccount;
