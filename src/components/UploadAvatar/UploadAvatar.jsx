import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfilePicture } from '../../state/auth/actions';

import useStyles from './styles';

export default function UploadAvatar({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    if (!file) return;
    dispatch(updateUserProfilePicture(file));
  }, [file]);

  return (
    <Avatar className={classes.avatar}>
      <label className={classes.label}>
        {children}
        <input type="file" accept="image/*" onChange={fileChangeHandler} hidden />
      </label>
    </Avatar>
  );
}
