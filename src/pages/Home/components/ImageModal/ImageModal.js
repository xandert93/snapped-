import { Box } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';

const ImageModal = ({ closeModal, modalImgURL }) => {
  const classes = useStyles();

  return (
    <Box className={classes.modal} onClick={closeModal}>
      <Box className={classes.modalBody}>
        <img
          className={classes.modalImg}
          src={modalImgURL}
          alt="clicked image..."
        />
      </Box>
    </Box>
  );
};

export default ImageModal;
