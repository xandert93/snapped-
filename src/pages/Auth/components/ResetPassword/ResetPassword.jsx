import { TextField, Button, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { authFormsContext } from '../../../../contexts/4.authForms/authFormsContext';
import useStyles from './styles';

const ResetPassword = () => {
  const classes = useStyles();
  const { email, changeHandler, msgData, isSubmitting } =
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
        Reset Password
      </Button>
    </>
  );
};

export default ResetPassword;
