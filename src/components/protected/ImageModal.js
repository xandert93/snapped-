import React from 'react';

const ImageModal = ({ setShowModal, modalImgURL }) => {
  const closeModal = (e) => e.target === e.currentTarget && setShowModal(false);

  return (
    <div className="modal" onClick={closeModal}>
      <div style={{ display: 'flex' }} className="modal-body">
        <div className="img-box">
          <img src={modalImgURL} alt="" />
        </div>
        <div className="img-details">Details n shit</div>
      </div>
    </div>
  );
};

export default ImageModal;
