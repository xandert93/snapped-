import { useContext } from 'react';
import { profileContext } from '../../../../contexts/5.profile/profileContext';

import { SlidingModal } from '../../../../components/SlidingModal';
import { UpdatePostForm } from '../UpdatePostForm';

const UpdateModal = () => {
  const { postToUpdate, resetPostToUpdate } = useContext(profileContext);

  return (
    <SlidingModal
      isOpen={!!postToUpdate}
      close={resetPostToUpdate}
      title="Edit Your Post!">
      {postToUpdate && (
        <UpdatePostForm
          imageURL={postToUpdate.url}
          postToUpdate={postToUpdate}
          closeModal={resetPostToUpdate}
        />
      )}
    </SlidingModal>
  );
};

export default UpdateModal;
