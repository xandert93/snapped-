import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useContext, useRef, useState } from 'react';
import authContext from '../../../../contexts/1.auth/authContext';
import { useSetDocumentTitle } from '../../../../custom-hooks';
import { db } from '../../../../lib/firebase/config';
// import { updatePostsUsername } from '../../../../services/firebase';

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
  useSetDocumentTitle('My Account');
  const {
    currentUserDoc,
    setCurrentUserDoc,
    updateEmail,
    updatePassword,
    updateProfileData,
  } = useContext(authContext);

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
      fullName !== currentUserDoc.fullName
      // || username !== currentUserDoc.username
    ) {
      promises.push(
        db.collection('Users').doc(currentUserDoc.id).update({
          fullName /*, username */,
        })
      );
    }

    // if (username !== currentUserDoc.username) {
    //   promises.push(updateProfileData({ displayName: username }));
    //   promises.push(updatePostsUsername(currentUserDoc.username, username));
    // }

    if (email !== currentUserDoc.email) promises.push(updateEmail(email));
    if (password && password !== currentUserDoc.password)
      promises.push(updatePassword(password));

    if (!promises.length)
      return setErrMsg('Please update your account details before submitting.');

    try {
      setIsUpdating(true);
      //first need to update Auth user, DB user and current propagated user
      await Promise.all(promises)
        .then(() =>
          setCurrentUserDoc((x) => ({ ...x, fullName, /*username,*/ email }))
        )
        .finally(() => setIsUpdating(false));
      setSuccessMsg('Your account details have been updated.');
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <form onSubmit={attemptUpdate}>
      {successMsg && <Typography color="primary">{successMsg}</Typography>}

      <TextField
        className={classes.textField}
        inputRef={fullNameRef}
        variant="outlined"
        label="Full Name"
        defaultValue={currentUserDoc.fullName}
        required
      />
      {/* <TextField
        className={classes.textField}
        inputRef={usernameRef}
        variant="outlined"
        label="Username"
        defaultValue={currentUserDoc.username}
        required
      /> */}
      <TextField
        className={classes.textField}
        inputRef={emailRef}
        variant="outlined"
        label="Email address"
        defaultValue={currentUserDoc.email}
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
      <Button
        onClick={async () => {
          const imageColl = db.collection('Posts');
          const postsColl = db.collection('Posts');
          const { docs: docRefs } = await imageColl.get();

          docRefs.forEach((docRef) => {
            postsColl.doc(docRef.id).set(docRef.data());
          });
        }}>
        New Coll
      </Button>
    </form>
  );
};

export default MyAccount;
