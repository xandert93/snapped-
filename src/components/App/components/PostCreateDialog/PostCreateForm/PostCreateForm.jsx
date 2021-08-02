import { useDispatch, useSelector } from 'react-redux';
import { setNewPost } from '../../../../../state/upload/actions';

import { PostForm } from '../../../../PostForm';

export default function PostCreateForm() {
  const dispatch = useDispatch();
  const { selectedFile, dataURL } = useSelector((state) => state.upload);

  const submitHandler = (description) => dispatch(setNewPost(description, selectedFile));

  return <PostForm imageURL={dataURL} post={null} submitHandler={submitHandler} />;
}

//when setNewPost dispatched --> !confirmedFile ? <PostForm/> (now unmounts) : <Progress/> (now mounts in parent <PostDialog>)
