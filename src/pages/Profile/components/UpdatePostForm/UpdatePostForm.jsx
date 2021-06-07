import { Save } from '@material-ui/icons';
import React from 'react';
import { PostForm } from '../../../../components';

const UpdatePost = (props) => (
  <PostForm type="update" submitIcon={<Save color="primary" />} {...props} />
);

export default UpdatePost;
