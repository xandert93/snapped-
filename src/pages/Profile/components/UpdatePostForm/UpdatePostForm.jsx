import { useContext } from 'react';
import { appContext } from '../../../../contexts/3.app/appContext';
import { updatePostDescription } from '../../../../services/firebase';
import { Check } from '@material-ui/icons';
import { PostForm } from '../../../../components';

const UpdatePostForm = ({ post, imageURL, closeModal }) => {
  const { setSnackbar, setIsSubmitting } = useContext(appContext);

  const updateHandler = async (newDescription) => {
    try {
      await updatePostDescription(post.id, newDescription);
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
      post={post}
      imageURL={imageURL}
      submitIcon={<Check color="inherit" />}
      submitHandler={updateHandler}
    />
  );
};

export default UpdatePostForm;
