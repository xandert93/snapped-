import { useSelector } from 'react-redux';
import { isSubmittingSelector } from '../../../../state/app/selectors';
import { Button } from '@material-ui/core';
import useStyles from './styles';

export default function SubmitButton({ children }) {
  const classes = useStyles();

  const isSubmitting = useSelector(isSubmittingSelector);

  return (
    <Button
      className={classes.submitButton}
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={isSubmitting}>
      {children}
    </Button>
  );
}
