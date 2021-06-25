import useStyles from './styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function ActionDialog({
  isDialogOpen,
  closeDialog,
  title,
  content,
  clickHandler,
}) {
  const classes = useStyles();

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle>Are you sure that you want to {title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          No
        </Button>
        <Button
          onClick={() => {
            closeDialog();
            clickHandler();
          }}
          color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
