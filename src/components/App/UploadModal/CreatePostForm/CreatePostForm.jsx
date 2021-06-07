import { Publish } from '@material-ui/icons';
import React, { useContext } from 'react';
import { uploadContext } from '../../../../contexts/2.upload/uploadContext';

import { PostForm } from '../../../PostForm';

const CreatePostForm = () => {
  const {
    fileData,
    dataURL: imageURL,
    setPostDescription,
    setConfirmedFile,
  } = useContext(uploadContext);

  return (
    <PostForm
      type="create"
      submitIcon={<Publish color="primary" />}
      {...{ fileData, imageURL, setPostDescription, setConfirmedFile }}
    />
  );
};

export default CreatePostForm;
