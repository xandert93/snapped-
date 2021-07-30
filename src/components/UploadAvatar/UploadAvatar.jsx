import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfilePicture } from '../../state/auth/actions';
import { setSuccessSnackbar } from '../../state/app/actions';
import { fbUploadProfilePic } from '../../services/firebase/storage/users';
import { fbUpdateUserProfilePic } from '../../services/firebase/firestore/users';
import useStyles from './styles';
import {
  userIdSelector,
  userUsernameSelector,
} from '../../state/auth/selectors';

export default function UploadAvatar({ children }) {
  const classes = useStyles();
  const userId = useSelector(userIdSelector);
  const userUsername = useSelector(userUsernameSelector);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    if (!file) return;

    (async () => {
      const url = await fbUploadProfilePic(userUsername, file);
      await fbUpdateUserProfilePic(userId, url);
      dispatch(updateUserProfilePicture(url));
      dispatch(setSuccessSnackbar('Your profile picture has been updated.'));
    })();
  }, [file]);

  return (
    <Avatar className={classes.avatar}>
      <label className={classes.label}>
        {children}
        <input
          type="file"
          accept="image/*"
          onChange={fileChangeHandler}
          hidden
        />
      </label>
    </Avatar>
  );
}
