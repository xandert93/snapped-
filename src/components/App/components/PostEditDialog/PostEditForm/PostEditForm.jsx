import { fbUpdatePost } from '../../../../../services/firebase/firestore/posts';
import { Check } from '@material-ui/icons';
import { PostForm } from '../../../../PostForm';
import { useDispatch } from 'react-redux';
import {
  setIsSubmitting,
  setSuccessSnackbar,
  setFailureSnackbar,
  closePostEditDialog,
} from '../../../../../state/app/actions';
import { updatePost } from '../../../../../state/posts/actions';

export default function PostEditForm({ post, imageURL }) {
  const dispatch = useDispatch();

  const updateHandler = async (newDescription) => {
    try {
      await fbUpdatePost(post.id, newDescription);
      dispatch(updatePost(newDescription));
      dispatch(setIsSubmitting(false));
      dispatch(closePostEditDialog());
      dispatch(setSuccessSnackbar('Your post has been updated.'));
    } catch (err) {
      // dispatch(setFailureSnackbar(err.message));
      // dispatch(setIsSubmitting(false))
    } finally {
    }
  };

  return (
    <PostForm
      post={post}
      imageURL={imageURL}
      submitIcon={<Check color="inherit" />}
      submitHandler={updateHandler}
    />
  );
}
