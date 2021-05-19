import { Button, Grid, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import authContext from '../../../../contexts/auth/authContext';
import useDb from '../../../../custom-hooks/useDb';
import ImageModal from './Posts/ImageModal.jsx';
import PostsGrid from './Posts/PostsGrid';
import useStyles from './Posts/styles';

const Home = ({ innerWidth }) => {
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
      <PostsGrid {...{ innerWidth, imgDocs, toggleModal }} />

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

export default Home;
