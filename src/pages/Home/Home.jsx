import { Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';

import { appContext } from '../../contexts/3.app/appContext';
import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';

import { SuggestedProfiles, PostsGrid, ImageModal } from './components';

const Home = () => {
  useSetDocumentTitle('Home');
  const { innerWidth } = useContext(appContext);

  const posts = usePostsCollection();

  const [showModal, setShowModal] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const openModal = (e) => {
    if (e.target.classList.contains('MuiCardMedia-root')) {
      setModalImgURL(posts[e.target.dataset.index].url);
      setShowModal(true);
    }
  };

  const closeModal = (e) => {
    if (e.target.className.includes('modalImg')) return;
    setShowModal(false);
  };

  return (
    <Grid container>
      {!!posts.length && (
        <PostsGrid
          {...{
            innerWidth,
            posts,
            openModal,
          }}
        />
      )}

      <SuggestedProfiles />

      {showModal && <ImageModal {...{ closeModal, modalImgURL }} />}
    </Grid>
  );
};

export default Home;
