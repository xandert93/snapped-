import React, { useContext, useState } from 'react';
import { appContext } from '../../contexts/3.app/appContext';
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

import { formatTagsToArr } from '../../utils/helpers';

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

const defaultDescription = {
  location: '',
  caption: '',
  tags: '',
  isPrivate: false,
};

const PostForm = ({
  imageURL,
  post,
  submitIcon,
  submitHandler,
  deleteHandler,
}) => {
  const classes = useStyles();
  const { isSubmitting, setIsSubmitting, msgData, setMsgData } =
    useContext(appContext);

  const currentDescription = post?.description && {
    ...post.description,
    tags: post.description.tags.join(', '),
  };

  const [description, setDescription] = useState(
    currentDescription || defaultDescription
  );

  const [areTagsInvalid, setAreTagsInvalid] = useState(false);

  const updateField = (e) =>
    setDescription((x) => ({ ...x, [e.target.name]: e.target.value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitting(true);
        submitHandler({
          ...description,
          tags: formatTagsToArr(description.tags),
        });
      }}
      className={classes.form}>
      <TextField
        label="Where was this taken?"
        required
        name="location"
        value={description.location}
        onChange={updateField}
      />
      <Box className={classes.imageBox} style={{ position: 'relative' }}>
        <img className={classes.image} src={imageURL} alt="Image Preview" />
        {!!deleteHandler && (
          <IconButton
            onClick={deleteHandler}
            disabled={isSubmitting}
            style={{ position: 'absolute', right: 5, top: 5 }}>
            <DeleteForever color="secondary" />
          </IconButton>
        )}
      </Box>
      <TextField
        label="Write your caption!"
        required
        name="caption"
        value={description.caption}
        onChange={updateField}
        multiline
        rows={3}
      />

      <TextField
        label="Give it some tags!"
        name="tags"
        value={description.tags}
        onChange={(e) => {
          updateField(e);
          setAreTagsInvalid(/[^#\w, ]/.test(e.target.value));
        }}
        error={areTagsInvalid}
        multiline
        rows={2}
      />

      <TextField
        select
        label="Choose post visibility:"
        required
        name="isPrivate"
        value={description.isPrivate}
        onChange={updateField}
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
            severity={msgData.success ? 'success' : 'error'}>
            {msgData.msg}
          </Alert>
        )}
      </Snackbar>

      <Button
        type="submit"
        disabled={
          description === post?.description || areTagsInvalid || isSubmitting
        }
        variant="contained"
        fullWidth>
        {submitIcon}
      </Button>
    </form>
  );
};

export default PostForm;
