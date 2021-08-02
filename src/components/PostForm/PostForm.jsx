import { useState } from 'react';
import useStyles from './styles';

import { Box, CircularProgress, IconButton, MenuItem, useMediaQuery } from '@material-ui/core';
import { Lock, Public } from '@material-ui/icons';
import _ from 'lodash';

import { formatTags } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSubmitting } from '../../state/app/selectors';
import { setIsSubmitting } from '../../state/app/actions';
import { TextField } from '../TextField';
import ChipInput from 'material-ui-chip-input';
import { useEffect } from 'react';
import {
  setDescription,
  updateDescription,
  setIsTagsValid,
  createTag,
  setIsDescriptionSame,
  deleteTag,
} from '../../state/postForm/actions';

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

export default function PostForm({ imageURL, post, submitHandler }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isTagsValid = useSelector((state) => state.postForm.isTagsValid);

  const existingDescription = post?.description;

  const [description, setDescription] = useState(existingDescription || defaultDescription);

  useEffect(() => {
    let bool = _.isEqual(description, existingDescription);
    dispatch(setIsDescriptionSame(bool));
  }, [description]);

  const handleInputChange = (e) => setDescription((x) => ({ ...x, [e.target.name]: e.target.value }));

  const validateTags = (e) => {
    let bool = /[#\w, ]/.test(e.target.value);
    dispatch(setIsTagsValid(bool));
  };

  const handleCreateTag = (tag) => {
    setDescription((x) => ({ ...x, tags: [...x.tags, tag] }));
  };

  const handleDeleteTag = (tagToDelete) => {
    setDescription((x) => ({
      ...x,
      tags: x.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler({ ...description, tags: formatTags(description.tags) });
  };

  return (
    <form className={classes.form} id="form" onSubmit={handleSubmit}>
      <Box className={classes.imageBox} style={{ position: 'relative' }}>
        <img className={classes.image} src={imageURL} alt="Image Preview" />
      </Box>
      <TextField
        label="Where was this taken?"
        name="location"
        value={description.location}
        onChange={handleInputChange}
      />
      <TextField
        label="Create a caption!"
        name="caption"
        value={description.caption}
        onChange={handleInputChange}
        multiline
        rows={3}
      />

      <ChipInput
        variant="outlined"
        fullWidth
        label="Give it some tags!"
        name="tags"
        value={description.tags}
        newChipKeyCodes={[32]}
        onUpdateInput={validateTags}
        helperText={!isTagsValid ? 'You cannot include special characters.' : null}
        FormHelperTextProps={{ className: classes.chipInputHelperText }}
        onAdd={handleCreateTag}
        onDelete={handleDeleteTag}
      />

      <TextField
        select
        label="Choose post visibility:"
        name="isPrivate"
        value={description.isPrivate}
        onChange={handleInputChange}
        helperText="Public posts are visible to all users!">
        {visibilities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
}

//OLD CAPTIONS TEXTFIELD:

/*   const existingDescription = post?.description && {
    ...post.description,
    tags: post.description.tags.join(', '),
  }; */

/* <TextField
     required={false}
     label="Give it some tags!"
     name="tags"
     value={description.tags}
     onChange={(e) => {
       handleInputChange(e);
       setIsTagsValid(/[^#\w, ]/.test(e.target.value));
     }}
     error={!isTagsValid}
     helperText={
       !isTagsValid ? 'You cannot include any special characters.' : null
     }
     multiline
     rows={2}
/> */
