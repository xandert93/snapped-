import useStyles from './styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function ConfirmationDialog({
  isOpen,
  close,
  title,
  content,
  choices,
  clickHandler,
}) {
  const classes = useStyles();

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Are you sure that you want to {title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          {choices[0]}
        </Button>
        <Button
          onClick={() => {
            close();
            clickHandler();
          }}
          color="secondary">
          {choices[1]}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
