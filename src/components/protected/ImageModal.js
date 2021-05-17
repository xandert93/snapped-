import React from 'react';

const ImageModal = ({ setShowModal, modalImgURL }) => {
  const closeModal = (e) =>
    e.target.className !== 'modal-img' && setShowModal(false);

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-body">
        <img className="modal-img" src={modalImgURL} alt="clicked image..." />
      </div>
    </div>
  );
};

export default ImageModal;
