import { useContext } from 'react';
import { appContext } from '../../../../contexts/3.app/appContext';
import { updatePostDescription } from '../../../../services/firebase/firestore';
import { Check } from '@material-ui/icons';
import { PostForm } from '../../../../components';
import { profileContext } from '../../../../contexts/5.profile/profileContext';
import { useDispatch } from 'react-redux';
import {
  setIsSubmitting,
  setSuccessSnackbar,
  setFailureSnackbar,
} from '../../../../state/app/actions';

const UpdatePostForm = ({ postToUpdate, imageURL, closeModal }) => {
  const { setHomePosts } = useContext(appContext);
  const { setPosts } = useContext(profileContext);

  const dispatch = useDispatch();

  const updateHandler = async (newDescription) => {
    try {
      await updatePostDescription(postToUpdate.id, newDescription);
      setHomePosts((posts) =>
        posts.map((post) =>
          post.id === postToUpdate.id
            ? { ...post, description: newDescription }
            : post
        )
      );

      //if we're on profile page and edit a post
      if (setPosts) {
        setPosts((posts) =>
          posts.map((post) =>
            post.id === postToUpdate.id
              ? { ...post, description: newDescription }
              : post
          )
        );
      }

      dispatch(setSuccessSnackbar('Your post has been updated.'));

      setTimeout(() => {
        closeModal();
        dispatch(setIsSubmitting(false));
      }, 1800);
    } catch (err) {
      // dispatch(setFailureSnackbar(err.message));
      // dispatch(setIsSubmitting(false))
    } finally {
    }
  };

  return (
    <PostForm
      post={postToUpdate}
      imageURL={imageURL}
      submitIcon={<Check color="inherit" />}
      submitHandler={updateHandler}
    />
  );
};

export default UpdatePostForm;
