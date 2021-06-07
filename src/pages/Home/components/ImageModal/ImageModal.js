import React from 'react';
import useStyles from './styles';

const ImageModal = ({ setShowModal, modalImgURL }) => {
  const classes = useStyles();

  const closeModal = (e) => {
    if (e.target.className.includes('modalImg')) return;
    setShowModal(false);
  };

  return (
    <div className={classes.modal} onClick={closeModal}>
      <div className={classes.modalBody}>
        <img
          className={classes.modalImg}
          src={modalImgURL}
          alt="clicked image..."
        />
      </div>
    </div>
  );
};

export default ImageModal;
