import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import useDb from '../../../../custom-hooks/useDb';
import ImageModal from './Posts/ImageModal.jsx';
import PostsGrid from './Posts/PostsGrid';
import useStyles from './Posts/styles';

const Home = ({ innerWidth }) => {
  const classes = useStyles();
  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(4);
  const imageDocs = useDb('Image URL Data', numOfRequestedDocs);

  const [showModal, setShowModal] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const toggleModal = (e) => {
    if (e.target.classList.contains('MuiCardMedia-root')) {
      setModalImgURL(imageDocs[e.target.dataset.index].url);
      setShowModal(true);
    }
  };

  return (
    <>
      <PostsGrid {...{ innerWidth, imageDocs, toggleModal }} />

      {imageDocs.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs((x) => x + 4)}>
            Fetch more
          </Button>
        </div>
      )}

      {showModal && <ImageModal {...{ setShowModal, modalImgURL }} />}
    </>
  );
};

export default Home;
