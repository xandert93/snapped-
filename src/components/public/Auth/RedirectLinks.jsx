import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const RedirectLinks = ({ userAction }) => {
  const classes = useStyles();

  return (
    <Box className={classes.redirectsBox}>
      {userAction === 'login' && (
        <>
          <Typography>
            Forgotten Password?{' '}
            <Link className={classes.redirectLink} to="/auth/password-reset">
              Reset Password
            </Link>
          </Typography>
          <Typography>
            No Account?{' '}
            <Link className={classes.redirectLink} to="/auth/register">
              Create an Account
            </Link>
          </Typography>
        </>
      )}
      {userAction === 'password-reset' && (
        <Typography>
          Remembered Password?{' '}
          <Link className={classes.redirectLink} to="/auth/login">
            Log in
          </Link>
        </Typography>
      )}
      {userAction === 'register' && (
        <Typography>
          Already registered?{' '}
          <Link className={classes.redirectLink} to="/auth/login">
            Log in
          </Link>
        </Typography>
      )}
    </Box>
  );
};

export default RedirectLinks;
