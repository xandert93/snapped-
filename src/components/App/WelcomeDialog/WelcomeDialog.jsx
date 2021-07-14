import useStyles from './styles';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
  Avatar,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { UploadAvatar } from '../../UploadAvatar';
import { useMediaQuery } from '@material-ui/core';
import { userSelector } from '../../../state/selectors';

export default function WelcomeDialog() {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.only('xs'));

  const { username, fullName, followers, profilePicURL, bio } =
    useSelector(userSelector);

  // const isUserNew = !profilePicURL || !bio || !followers.length
  const isUserNew = true;

  const [isDialogOpen, setIsDialogOpen] = useState(isUserNew);

  const close = () => setIsDialogOpen(false);

  return (
    <Dialog fullScreen={isVPxs} open={isDialogOpen}>
      <DialogTitle>
        Welcome to "snapped!", {fullName.split(' ')[0]}!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          We can see that you're new on the block!
        </DialogContentText>
        {profilePicURL && (
          <>
            <DialogContentText>
              Choose a profile picture for people to see:
            </DialogContentText>
            <Avatar
              component={UploadAvatar} //2 props below provide <img> {children}
              alt={fullName}
              src={profilePicURL}
            />
          </>
        )}
        <DialogContentText>
          What's the purpose of your account:
        </DialogContentText>
        <TextField
          margin="dense"
          id=""
          label="Account type (DD)"
          required={false}
          helperText="helper text"
          fullWidth
        />
        <DialogContentText>
          Tell other users more about yourself:
        </DialogContentText>
        <TextField
          margin="dense"
          id=""
          label="Pronouns (DD)"
          helperText="helper text"
          multiline
        />
        <TextField
          margin="dense"
          id=""
          label="Biography"
          helperText="helper text"
          multiline
          rows={5}
          fullWidth
        />
        <TextField
          margin="dense"
          id=""
          label="Website"
          helperText="helper text"
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          choice 0
        </Button>
        <Button
          onClick={() => {
            close();
            //clickhandler()
          }}
          color="secondary">
          choice 1
        </Button>
      </DialogActions>
    </Dialog>
  );
}