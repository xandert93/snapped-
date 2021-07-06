import { useContext } from 'react';
import { appContext } from '../../../../contexts/3.app/appContext';
import { updatePostDescription } from '../../../../services/firebase';
import { Check } from '@material-ui/icons';
import { PostForm } from '../../../../components';
import { profileContext } from '../../../../contexts/5.profile/profileContext';

const UpdatePostForm = ({ postToUpdate, imageURL, closeModal }) => {
  const { setSnackbar, setIsSubmitting, setHomePosts } = useContext(appContext);
  const { setPosts } = useContext(profileContext);

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

      setSnackbar({
        isOpen: true,
        isSuccess: true,
        message: 'Your post has been updated.',
      });

      setTimeout(() => {
        closeModal();
        setIsSubmitting(false);
      }, 1800);
    } catch (err) {
      // setSnackbar({isOpen: true, isSuccess: false, message: err.message });
      // setIsSubmitting(false);
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
