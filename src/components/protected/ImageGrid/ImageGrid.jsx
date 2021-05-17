import { Button, Grid, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import authContext from '../../../contexts/auth/authContext';
import useDb from '../../../custom-hooks/useDb';
import UploadForm from '../image-upload/UploadForm';
import ImageModal from '../ImageModal';
import ImageCard from './ImageCard/ImageCard';
import useStyles from './styles';

const ImageGrid = ({ innerWidth }) => {
  const classes = useStyles();
  const { currentUser } = useContext(authContext);
  const [numOfImgsShown, setNumofImgsShown] = useState(4);
  const imgDocs = useDb('Image URL Data', numOfImgsShown);

  const [showModal, setShowModal] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const toggleModal = (e) => {
    if (e.target.classList.contains('MuiCardMedia-root')) {
      setModalImgURL(imgDocs[e.target.dataset.index].url);
      setShowModal(true);
    }
  };

  return (
    <>
      <Typography component="h2" variant="h4">
        Welcome, {currentUser.displayName}!
      </Typography>
      <UploadForm />
      <Grid
        container
        spacing={4}
        className={classes.imagesContainer}
        onClick={innerWidth > 600 ? toggleModal : null}>
        {imgDocs.map((imgDoc, idx) => (
          <ImageCard key={imgDoc.id} {...{ imgDoc, idx }} />
        ))}
      </Grid>
      {imgDocs.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setNumofImgsShown((x) => x + 4)}>
            Fetch more
          </Button>
        </div>
      )}

      {showModal && <ImageModal {...{ setShowModal, modalImgURL }} />}
    </>
  );
};

export default ImageGrid;
