import { useSelector } from 'react-redux';
import { selectIsSubmitting } from '../../../state/app/selectors';

import { IconButton, useMediaQuery } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, Close as CloseIcon } from '@material-ui/icons';

import { checkIsVPxs } from '../../../styles/mqSelectors';

export default function DismissButton({ clickHandler }) {
  const isVPxs = useMediaQuery(checkIsVPxs);

  const isSubmitting = useSelector(selectIsSubmitting);

  return (
    <IconButton edge="end" onClick={clickHandler} disabled={isSubmitting}>
      {isVPxs ? <ArrowBackIcon /> : <CloseIcon />}
    </IconButton>
  );
}
