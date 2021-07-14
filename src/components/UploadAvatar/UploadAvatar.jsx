import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../state/auth/actions';
import { setSuccessSnackbar } from '../../state/app/actions';
import { uploadProfilePicture } from '../../services/firebase/firestore';
import useStyles from './styles';
import { userSelector } from '../../state/selectors';

export default function UploadAvatar({ children }) {
  const classes = useStyles();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    if (!file) return;

    uploadProfilePicture(user, file).then((url) => {
      dispatch(setSuccessSnackbar('Your profile picture has been updated.'));
      dispatch(setUser({ ...user, profilePicURL: url }));
    });
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
