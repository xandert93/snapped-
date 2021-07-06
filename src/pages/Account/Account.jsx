import { useContext, useRef, useState } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';
import { Button, TextField, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import { useSetDocumentTitle } from '../../custom-hooks';
import { db } from '../../lib/firebase/config';

// import { updatePostsUsername } from '../../../../services/firebase';

export default function Account() {
  const classes = useStyles();
  useSetDocumentTitle('My Account');
  const { user, setUser, updateEmail, updatePassword, updateProfileData } =
    useContext(authContext);

  const [errMsg, setErrMsg] = useState('');
  //inefficient - make into a single message
  const [successMsg, setSuccessMsg] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fullNameRef = useRef();
  // const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const attemptUpdate = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setSuccessMsg('');
    const fullName = fullNameRef.current.value;
    // const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    if (password !== passwordConfirm) {
      return setErrMsg('The two entered password do not match.');
    }

    //REFACTOR:
    const promises = [];
    if (
      fullName !== user.fullName
      // || username !== user.username
    ) {
      promises.push(
        db.collection('Users').doc(user.id).update({
          fullName /*, username */,
        })
      );
    }

    // if (username !== user.username) {
    //   promises.push(updateProfileData({ displayName: username }));
    //   promises.push(updatePostsUsername(user.username, username));
    // }

    if (email !== user.email) promises.push(updateEmail(email));
    if (password && password !== user.password)
      promises.push(updatePassword(password));

    if (!promises.length)
      return setErrMsg('Please update your account details before submitting.');

    try {
      setIsUpdating(true);
      //first need to update Auth user, DB user and current propagated user
      await Promise.all(promises)
        .then(() => setUser((x) => ({ ...x, fullName, /*username,*/ email })))
        .finally(() => setIsUpdating(false));
      setSuccessMsg('Your account details have been updated.');
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <form className={classes.form} onSubmit={attemptUpdate}>
        {successMsg && <Typography color="primary">{successMsg}</Typography>}

        <TextField
          className={classes.textField}
          inputRef={fullNameRef}
          variant="outlined"
          label="Full Name"
          defaultValue={user.fullName}
          required
        />
        {/* <TextField
        className={classes.textField}
        inputRef={usernameRef}
        variant="outlined"
        label="Username"
        defaultValue={user.username}
        required
      /> */}
        <TextField
          className={classes.textField}
          inputRef={emailRef}
          variant="outlined"
          label="Email address"
          defaultValue={user.email}
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
          disabled={isUpdating}>
          Update Details
        </Button>
      </form>
    </Container>
  );
}
