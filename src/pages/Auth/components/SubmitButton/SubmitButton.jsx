import { useSelector } from 'react-redux';
import { selectIsSubmitting } from '../../../../state/app/selectors';
import { Button } from '@material-ui/core';
import useStyles from './styles';

export default function SubmitButton({ children }) {
  const classes = useStyles();

  const isSubmitting = useSelector(selectIsSubmitting);

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
