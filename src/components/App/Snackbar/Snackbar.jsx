import useStyles from './styles';
import { Snackbar as MuiSnackbar, Grow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext } from 'react';
import { appContext } from '../../../contexts/3.app/appContext';

export default function Snackbar() {
  const classes = useStyles();

  const {
    snackbar: { isOpen, isSuccess, message },
    resetSnackbar,
  } = useContext(appContext);

  return (
    <MuiSnackbar
      className={classes.snackbar}
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={6000}
      onClose={resetSnackbar}
      TransitionComponent={Grow}>
      <Alert onClose={resetSnackbar} severity={isSuccess ? 'success' : 'error'}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
