import { CloudUpload } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSubmitting } from '../../../../state/app/actions';
import { setNewPost } from '../../../../state/upload/actions';

import { PostForm } from '../../../PostForm';

export default function PostCreationForm() {
  const dispatch = useDispatch();
  const { fileData, dataURL } = useSelector((state) => state.upload);

  //when setNewPost called --> !file ? <PostForm/> (now unmounts) : <Progress/> (now mounts)

  const submitHandler = (description) => {
    dispatch(setNewPost(description, fileData.file));
    dispatch(setIsSubmitting(false));
  };

  return (
    <PostForm
      imageURL={dataURL}
      submitIcon={<CloudUpload color="inherit" />}
      submitHandler={submitHandler}
    />
  );
}
