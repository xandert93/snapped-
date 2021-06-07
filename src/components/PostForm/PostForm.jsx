import React, { useRef, useState } from 'react';
import { updatePostDescription, deletePost } from '../../services/firebase';
import useStyles from './styles';

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Slide,
  Snackbar,
  TextField,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { DeleteForever, Lock, Public } from '@material-ui/icons';

const iconStyles = { fontSize: 20, marginLeft: 8, verticalAlign: -4 };
const visibilities = [
  {
    label: (
      <>
        Public
        <Public style={iconStyles} />
      </>
    ),
    value: false,
  },
  {
    label: (
      <em>
        Private
        <Lock style={iconStyles} />
      </em>
    ),
    value: true,
  },
];

const PostForm = ({
  type,
  imageURL,
  submitIcon,
  //create
  fileData,
  setConfirmedFile,
  setPostDescription,
  //update
  doc: {
    id,
    description: { location, caption, isPrivate },
  },
  closeModal,
}) => {
  const classes = useStyles();

  const locationRef = useRef();
  const captionRef = useRef();
  const privacyRef = useRef();

  const [msgData, setMsgData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserInput = (e) => {
    e.preventDefault();
    return [locationRef, captionRef, privacyRef].map(
      ({ current: { value } }) => value
    );
  };

  const createHandler = (e) => {
    const [location, caption, isPrivate] = getUserInput(e);
    setPostDescription({ location, caption, isPrivate });
    setConfirmedFile(fileData.file);
    //!file ? <PostForm/> (now unmounts) : <Progress/> (now mounts)
  };

  const updateHandler = async (e) => {
    setIsSubmitting(true);
    const [newLocation, newCaption, newIsPrivate] = getUserInput(e);

    if (
      newLocation === location &&
      newCaption === caption &&
      newIsPrivate === isPrivate
    ) {
      setMsgData({
        success: false,
        msg: 'Please make a change before submitting.',
      });
      return setIsSubmitting(false);
    }

    const newDescription = {
      location: newLocation,
      caption: newCaption,
      isPrivate: newIsPrivate,
    };

    try {
      await updatePostDescription(id, newDescription);
      setMsgData({ success: true, msg: 'Post updated.' });
      setTimeout(closeModal, 1800);
    } catch (err) {
      // setMsgData({ success: false, msg: err.message });
      // setIsSubmitting(false);
    }
  };

  const submitHandler = type === 'create' ? createHandler : updateHandler;

  const deleteHandler = async () => {
    setIsSubmitting(true);

    try {
      await deletePost(id);
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
            onClick={deleteHandler}
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

      <TextField
        select
        defaultValue={isPrivate}
        inputRef={privacyRef}
        label="Choose post visibility:"
        required
        helperText="Public posts are visible to all users!">
        {visibilities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

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
      caption: null,
      isPrivate: false,
    },
  },
};

export default PostForm;
