import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../../../../state/posts/actions';
import { PostForm } from '../../../../PostForm';

export default function PostEditForm() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.postToEdit);

  const submitHandler = (newDescription) => dispatch(updatePost(newDescription));

  return <PostForm imageURL={post.url} post={post} submitHandler={submitHandler} />;
}
