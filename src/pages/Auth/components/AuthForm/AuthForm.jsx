import { Box, Typography } from '@material-ui/core';

import { useContext } from 'react';
import { authFormsContext } from '../../../../contexts/4.authForms/authFormsContext';
import useStyles from './styles';
import logo from '../../../../assets/images/snapped.ico';

const AuthForm = ({ children }) => {
  const { submitHandler } = useContext(authFormsContext);
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Box>
        <img src={logo} alt="snapped!" className={classes.logoImg} />
      </Box>
      <Typography variant="h4" component="h1">
        snapped!
      </Typography>
      {children}
    </form>
  );
};

export default AuthForm;
