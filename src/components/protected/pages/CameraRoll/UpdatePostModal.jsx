import React from 'react';
import { Save } from '@material-ui/icons';
import SlidingDialog from '../../SlidingDialog';
import SlidingDialogForm from '../../SlidingDialogForm';

const UpdatePostModal = ({ showModal, setShowModal, modalImgDoc }) => {
  return (
    <SlidingDialog
      {...{
        showModal,
        closeModal: () => setShowModal(false),
        modalHeading: 'Edit Your Post!',
      }}>
      <SlidingDialogForm
        {...{
          type: 'update',
          docID: modalImgDoc.id,
          imageURL: modalImgDoc.url,
          location: modalImgDoc.description.location,
          caption: modalImgDoc.description.description,
          submitIcon: <Save color="primary" />,
          closeModal: () => setShowModal(false),
        }}
      />
    </SlidingDialog>
  );
};

export default UpdatePostModal;