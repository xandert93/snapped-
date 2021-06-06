import React, { useContext } from 'react';
import { profileContext } from '../../contexts/4.profile/profileContext';
import UpdatePostForm from './pages/Home/Posts/UpdatePostForm';
import SlidingModal from './SlidingModal';

const UpdateModal = () => {
  const { modalPost, resetModalPost } = useContext(profileContext);

  return (
    <SlidingModal
      showModal={!!modalPost}
      closeModal={resetModalPost}
      modalHeading="Edit Your Post!">
      {modalPost && (
        <UpdatePostForm
          imageURL={modalPost.url}
          doc={modalPost}
          closeModal={resetModalPost}
        />
      )}
    </SlidingModal>
  );
};

export default UpdateModal;
