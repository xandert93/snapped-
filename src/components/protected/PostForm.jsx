import React, { useRef, useState } from 'react';
import { db } from '../../firebase/config';
import useStyles from './styles';

import {
  Box,
  Button,
  IconButton,
  Slide,
  Snackbar,
  TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DeleteForever } from '@material-ui/icons';

const PostForm = ({
  type,
  imageURL,
  submitIcon,
  //create
  fileData,
  setFile,
  setDescription,
  //update
  doc: {
    id,
    description: { location, description: caption },
  },
  closeModal,
}) => {
  const classes = useStyles();

  const locationRef = useRef();
  const captionRef = useRef();

  const [msgData, setMsgData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserInput = (e) => {
    e.preventDefault();
    return [locationRef.current.value, captionRef.current.value];
  };

  const createPost = (e) => {
    const [location, caption] = getUserInput(e);
    setDescription({ location, date: 'we on it', description: caption });
    setFile(fileData.file);
  };

  const updatePost = async (e) => {
    setIsSubmitting(true);
    const [newLocation, newCaption] = getUserInput(e);

    if (newLocation === location && newCaption === caption) {
      setMsgData({
        success: false,
        msg: 'Please make a change before submitting.',
      });
      return setIsSubmitting(false);
    }

    try {
      await db
        .collection('Image URL Data')
        .doc(id)
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
      setTimeout(closeModal, 1800);
    } catch (err) {
      // setMsgData({ success: false, msg: err.message });
      // setIsSubmitting(false);
    }
  };

  const submitHandler = type === 'create' ? createPost : updatePost;

  const deletePost = async () => {
    setIsSubmitting(true);

    try {
      await db.collection('Image URL Data').doc(id).delete();
      setMsgData({ success: true, msg: 'Post deleted.' });
      setTimeout(closeModal, 2000);
    } catch (err) {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
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

      <Snackbar
        open={!!msgData}
        autoHideDuration={5000}
        onClose={() => setMsgData(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={Slide}>
        {msgData && (
          //Violent unmount makes animation crap.
          //setting default state to {success: null, msg: ""} made it better
          //but fact msg becomes "" onClose, meant that snackbar became really small
          //might need to use setTimeout to wait for exit animation to finish and then set back to default state
          <Alert
            onClose={() => setMsgData(null)}
            elevation={6}
            variant="filled"
            severity={`${msgData.success ? 'success' : 'error'}`}>
            {msgData.msg}
          </Alert>
        )}
      </Snackbar>

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="contained"
        fullWidth>
        {submitIcon}
      </Button>
    </form>
  );
};

PostForm.defaultProps = {
  doc: {
    id: null,
    description: {
      location: null,
      desription: null,
    },
  },
};

export default PostForm;
