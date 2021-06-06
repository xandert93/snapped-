import React, { useContext } from 'react';
import { uploadContext } from '../../contexts/2.upload/uploadContext';
import Progress from './layout/Progress/Progress';
import CreatePostForm from './pages/Home/Posts/CreatePostForm';
import SlidingModal from './SlidingModal';

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
