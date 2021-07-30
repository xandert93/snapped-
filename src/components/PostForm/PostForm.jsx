import { useState } from 'react';
import useStyles from './styles';

import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import { Lock, Public } from '@material-ui/icons';
import _ from 'lodash';

import { formatTags } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { isSubmittingSelector } from '../../state/app/selectors';
import { setIsSubmitting } from '../../state/app/actions';
import { TextField } from '../TextField';
import ChipInput from 'material-ui-chip-input';

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
  tags: [],
  isPrivate: false,
};

export default function PostForm({
  imageURL,
  post,
  submitIcon,
  submitHandler,
}) {
  const classes = useStyles();
  const isSubmitting = useSelector(isSubmittingSelector);
  const dispatch = useDispatch();

  // const existingDescription = post?.description && {
  //   ...post.description,
  //   tags: post.description.tags.join(', '),
  // };

  const existingDescription = post?.description;

  const [description, setDescription] = useState(
    existingDescription || defaultDescription
  );

  const updateField = (e) =>
    setDescription((x) => ({ ...x, [e.target.name]: e.target.value }));

  const [areTagsInvalid, setAreTagsInvalid] = useState(false);

  const checkIfTagsAreInvalid = (e) =>
    setAreTagsInvalid(/[^#\w, ]/.test(e.target.value));

  const handleCreateChip = (tag) => {
    setDescription((x) => ({ ...x, tags: [...x.tags, tag] }));
  };
  const handleDeleteChip = (tagToDelete) => {
    setDescription((x) => ({
      ...x,
      tags: x.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(setIsSubmitting(true));
        submitHandler({
          ...description,
          tags: formatTags(description.tags),
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

      {/* <TextField
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
      /> */}

      <ChipInput
        variant="outlined"
        fullWidth
        label="Give it some tags!"
        name="tags"
        value={description.tags}
        newChipKeyCodes={[32]}
        onUpdateInput={checkIfTagsAreInvalid}
        helperText={
          areTagsInvalid ? 'You cannot include special characters.' : null
        }
        FormHelperTextProps={{ className: classes.chipInputHelperText }}
        onAdd={handleCreateChip}
        onDelete={handleDeleteChip}
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
            variant="contained">
            {submitIcon}
          </IconButton>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </form>
  );
}
