import React, { useContext } from 'react';
import { profileContext } from '../../../../contexts/5.profile/profileContext';

import { SlidingModal } from '../../../../components/SlidingModal';
import { UpdatePostForm } from '../UpdatePostForm';

const UpdateModal = () => {
  const { postToEdit, resetPostToEdit } = useContext(profileContext);

  return (
    <SlidingModal
      isOpen={!!postToEdit}
      close={resetPostToEdit}
      title="Edit Your Post!">
      {postToEdit && (
        <UpdatePostForm
          imageURL={postToEdit.url}
          post={postToEdit}
          closeModal={resetPostToEdit}
        />
      )}
    </SlidingModal>
  );
};

export default UpdateModal;
