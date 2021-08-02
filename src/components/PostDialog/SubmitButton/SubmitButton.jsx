import { useSelector } from 'react-redux';
import { selectIsSubmitting } from '../../../state/app/selectors';
import { selectIsSubmitDisabled } from '../../../state/postForm/selectors';

import { IconButton, CircularProgress } from '@material-ui/core';

export default function SubmitButton({ SubmitIcon }) {
  const isSubmitting = useSelector(selectIsSubmitting);
  const isSubmitDisabled = useSelector(selectIsSubmitDisabled);

  return !isSubmitting ? (
    <IconButton edge="start" type="submit" form="form" disabled={isSubmitDisabled}>
      <SubmitIcon />
    </IconButton>
  ) : (
    <CircularProgress thickness={6} size={30} />
  );
}
