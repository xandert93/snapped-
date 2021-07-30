import useStyles from './styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmationDialog } from '../../../../state/app/actions';
import { confirmationDialogSelector } from '../../../../state/app/selectors';

export default function ConfirmationDialog({}) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isOpen, title, content, choices, confirmHandler } = useSelector(
    confirmationDialogSelector
  );

  const closeHandler = () => dispatch(closeConfirmationDialog());

  return (
    <Dialog open={isOpen} onClose={closeHandler}>
      <DialogTitle>Are you sure that you want to {title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          {choices[0]}
        </Button>
        <Button
          onClick={() => {
            closeHandler();
            confirmHandler();
          }}
          color="secondary">
          {choices[1]}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
