import { useContext, useState } from 'react';
import { appContext } from '../../contexts/3.app/appContext';
import useStyles from './styles';

import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Lock, Public } from '@material-ui/icons';
import _ from 'lodash';

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

const PostForm = ({ imageURL, post, submitIcon, submitHandler }) => {
  const classes = useStyles();
  const { isSubmitting, setIsSubmitting } = useContext(appContext);

  const existingDescription = post?.description && {
    ...post.description,
    tags: post.description.tags.join(', '),
  };

  const [description, setDescription] = useState(
    existingDescription || defaultDescription
  );
  console.log(formatTagsToArr(description.tags));
  const [areTagsInvalid, setAreTagsInvalid] = useState(false);

  const updateField = (e) =>
    setDescription((x) => ({ ...x, [e.target.name]: e.target.value }));

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitting(true);
        submitHandler({
          ...description,
          tags: formatTagsToArr(description.tags),
        });
      }}>
      <Box className={classes.imageBox} style={{ position: 'relative' }}>
        <img className={classes.image} src={imageURL} alt="Image Preview" />
      </Box>
      <TextField
        label="Where was this taken?"
        name="location"
        value={description.location}
        onChange={updateField}
      />
      <TextField
        label="Write your caption!"
        name="caption"
        value={description.caption}
        onChange={updateField}
        multiline
        rows={3}
      />

      <TextField
        required={false}
        label="Give it some tags!"
        name="tags"
        value={description.tags}
        onChange={(e) => {
          updateField(e);
          setAreTagsInvalid(/[^#\w, ]/.test(e.target.value));
        }}
        error={areTagsInvalid}
        helperText={
          areTagsInvalid ? 'You cannot include any special characters.' : null
        }
        multiline
        rows={2}
      />

      <TextField
        select
        label="Choose post visibility:"
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

      <Box
      // className={classes.submitButtonBox}
      >
        {!isSubmitting ? (
          <IconButton
            className={classes.submitButton}
            type="submit"
            disabled={
              _.isEqual(description, existingDescription) || areTagsInvalid
            }
            variant="contained"
            fullWidth>
            {submitIcon}
          </IconButton>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </form>
  );
};

export default PostForm;
