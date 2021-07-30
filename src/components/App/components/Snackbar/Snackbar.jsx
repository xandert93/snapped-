import useStyles from './styles';
import { Snackbar as MuiSnackbar, Grow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { removeSnackbar } from '../../../../state/app/actions';
import { snackbarSelector } from '../../../../state/app/selectors';

export default function Snackbar() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isOpen, isSuccess, message } = useSelector(snackbarSelector);

  return (
    <MuiSnackbar
      className={classes.snackbar}
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={5000}
      onClose={() => dispatch(removeSnackbar())}
      TransitionComponent={Grow}>
      <Alert
        onClose={() => dispatch(removeSnackbar())}
        severity={isSuccess ? 'success' : 'error'}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
