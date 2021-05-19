import React, { useRef, useState } from 'react';
import { db } from '../../firebase/config';
import useStyles from './styles';

import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

const DialogForm = ({
  type,
  imageURL,
  submitIcon,
  //create
  fileInfo,
  setFile,
  setDescription,
  //update
  docID,
  location,
  caption,
  closeModal,
}) => {
  const classes = useStyles();

  const locationRef = useRef();
  const captionRef = useRef();

  const [msgData, setMsgData] = useState(null);

  const getUserInput = (e) => {
    e.preventDefault();
    setMsgData(null);
    return [locationRef.current.value, captionRef.current.value];
  };

  const createPost = (e) => {
    const [location, caption] = getUserInput(e);
    setDescription({ location, date: 'we on it', description: caption });
    setFile(fileInfo.file);
  };

  const updatePost = async (e) => {
    const [newLocation, newCaption] = getUserInput(e);

    if (newLocation === location && newCaption === caption) {
      return setMsgData({
        success: false,
        msg: 'Please make a change before submitting.',
      });
    }

    try {
      await db
        .collection('Image URL Data')
        .doc(docID)
        .set(
          {
            description: {
              location: newLocation,
              date: 'we on it',
              description: newCaption,
            },
          },
          { merge: true }
        );
      setMsgData({ success: true, msg: 'Post updated.' });
      closeModal();
    } catch (err) {}
  };

  const submitHandler = type === 'create' ? createPost : updatePost;

  const deletePost = async () => {
    setMsgData(null);

    try {
      await db.collection('Image URL Data').doc(docID).delete();
      setMsgData({ success: true, msg: 'Post deleted.' });
      closeModal();
    } catch (err) {}
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <TextField
        inputRef={locationRef}
        label="Where was this taken?"
        required
        defaultValue={location}
      />
      <Box className={classes.imageBox} style={{ position: 'relative' }}>
        <img className={classes.image} src={imageURL} alt="Image Preview" />
        {type === 'update' && (
          <IconButton
            onClick={deletePost}
            style={{ position: 'absolute', right: 5, top: 5 }}>
            <DeleteForever color="secondary" />
          </IconButton>
        )}
      </Box>
      <TextField
        inputRef={captionRef}
        label="Write your caption!"
        required
        defaultValue={caption}
        multiline
        rows={3}
      />
      {msgData && (
        <Typography color={`${msgData.success ? 'primary' : 'error'}`}>
          {msgData.msg}
        </Typography>
      )}
      <Button type="submit" variant="contained" fullWidth>
        {submitIcon}
      </Button>
    </form>
  );
};

DialogForm.defaultProps = {
  location: '',
  caption: '',
};

export default DialogForm;
