import React, { useContext } from 'react';
import { uploadContext } from '../../../contexts/2.upload/uploadContext';
import { SlidingModal } from '../../SlidingModal';
import CreatePostForm from './CreatePostForm/CreatePostForm';
import { Progress } from './Progress';

const UploadModal = () => {
  const { file, dataURL, resetForm } = useContext(uploadContext);
  return (
    <SlidingModal
      showModal={!!dataURL}
      closeModal={resetForm}
      modalHeading="Create Your Post!">
      {!file ? <CreatePostForm /> : <Progress />}
    </SlidingModal>
  );
};

export default UploadModal;
