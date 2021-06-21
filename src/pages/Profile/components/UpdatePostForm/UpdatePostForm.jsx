import { Save } from '@material-ui/icons';
import React, { useContext } from 'react';
import { PostForm } from '../../../../components';
import { appContext } from '../../../../contexts/3.app/appContext';
import {
  deletePost,
  updatePostDescription,
} from '../../../../services/firebase';

const UpdatePostForm = ({ post, imageURL, closeModal }) => {
  const { setMsgData } = useContext(appContext);

  const updateHandler = async (newDescription) => {
    try {
      await updatePostDescription(post.id, newDescription);
      setMsgData({ success: true, msg: 'Post updated.' });
      setTimeout(closeModal, 1800);
    } catch (err) {
      // setMsgData({ success: false, msg: err.message });
      // setIsSubmitting();
    } finally {
    }
  };

  const deleteHandler = async () => {
    try {
      await deletePost(post.id);
      setMsgData({ success: true, msg: 'Post deleted.' });
      setTimeout(closeModal, 2000);
    } catch (err) {
    } finally {
    }
  };

  return (
    <PostForm
      post={post}
      imageURL={imageURL}
      submitIcon={<Save color="primary" />}
      submitHandler={updateHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default UpdatePostForm;
