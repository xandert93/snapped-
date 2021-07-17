import { fbUpdatePost } from '../../../../services/firebase/firestore';
import { Check } from '@material-ui/icons';
import { PostForm } from '../../../../components';
import { useDispatch } from 'react-redux';
import {
  setIsSubmitting,
  setSuccessSnackbar,
  setFailureSnackbar,
} from '../../../../state/app/actions';
import { updatePost } from '../../../../state/posts/actions';

export default function PostEditForm({ post, imageURL, closeDialog }) {
  const dispatch = useDispatch();

  const updateHandler = async (newDescription) => {
    try {
      await fbUpdatePost(post.id, newDescription);
      dispatch(updatePost(newDescription));
      dispatch(setIsSubmitting(false));
      closeDialog(); //trace this call back - see if it can be improved
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
