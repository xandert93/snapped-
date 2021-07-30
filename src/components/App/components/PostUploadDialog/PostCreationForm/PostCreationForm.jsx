import { CloudUpload } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSubmitting } from '../../../../../state/app/actions';
import { setNewPost } from '../../../../../state/upload/actions';

import { PostForm } from '../../../../PostForm';

export default function PostCreationForm() {
  const dispatch = useDispatch();
  const { selectedFile, dataURL } = useSelector((state) => state.upload);

  //when setNewPost called --> !confirmedFile ? <PostForm/> (now unmounts) : <Progress/> (now mounts)

  const submitHandler = (description) => {
    dispatch(setNewPost(description, selectedFile));
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
