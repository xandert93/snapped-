import React, { useContext } from 'react';
import { profileContext } from '../../../../contexts/4.profile/profileContext';

import { SlidingModal } from '../../../../components/SlidingModal';
import { UpdatePostForm } from '../UpdatePostForm';

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
