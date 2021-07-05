import { CloudUpload } from '@material-ui/icons';
import { useContext } from 'react';
import { uploadContext } from '../../../../contexts/2.upload/uploadContext';
import { appContext } from '../../../../contexts/3.app/appContext';

import { PostForm } from '../../../PostForm';

const CreatePostForm = () => {
  const { fileData, dataURL, setPostDescription, setConfirmedFile } =
    useContext(uploadContext);

  const { setIsSubmitting } = useContext(appContext);

  const createPost = (description) => {
    setPostDescription(description);
    setConfirmedFile(fileData.file);
    setIsSubmitting(false);
    //!file ? <PostForm/> (now unmounts) : <Progress/> (now mounts)
  };

  return (
    <PostForm
      imageURL={dataURL}
      submitIcon={<CloudUpload color="inherit" />}
      submitHandler={createPost}
    />
  );
};

export default CreatePostForm;
