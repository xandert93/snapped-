import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import useSetDocumentTitle from '../../../../hooks/useSetDocumentTitle';
import useDb from '../../../../hooks/useDb';
import ImageModal from './Posts/ImageModal.jsx';
import PostsGrid from './Posts/PostsGrid';
import useStyles from './Posts/styles';

const Home = ({ innerWidth }) => {
  const classes = useStyles();
  useSetDocumentTitle();
  const [numOfDocsShown, setNumOfDocsShown] = useState(4);
  const [imageDocs, numOfAvailableDocs] = useDb('Image URL Data');

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
      <PostsGrid {...{ innerWidth, imageDocs, numOfDocsShown, toggleModal }} />

      {imageDocs.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            //ASS, if availDocs !% 4, error will be thrown at end. Need to fix
            disabled={numOfDocsShown === numOfAvailableDocs}
            onClick={() => setNumOfDocsShown((x) => x + 4)}>
            Fetch more
          </Button>
        </div>
      )}

      {showModal && <ImageModal {...{ setShowModal, modalImgURL }} />}
    </>
  );
};

export default Home;
