import { Button, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';

import { appContext } from '../../contexts/3.app/appContext';
import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';

import { SuggestedProfiles, PostsGrid, ImageModal } from './components';

const Home = () => {
  useSetDocumentTitle('Home');
  const { innerWidth } = useContext(appContext);

  const [numOfPostsShown, setNumOfPostsShown] = useState(4);
  const posts = usePostsCollection();

  const [showModal, setShowModal] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const toggleModal = (e) => {
    if (e.target.classList.contains('MuiCardMedia-root')) {
      setModalImgURL(posts[e.target.dataset.index].url);
      setShowModal(true);
    }
  };

  return (
    <Grid container>
      {!!posts.length && (
        <PostsGrid
          {...{
            innerWidth,
            posts,
            numOfPostsShown,
            setNumOfPostsShown,
            toggleModal,
          }}
        />
      )}

      <SuggestedProfiles />

      {showModal && <ImageModal {...{ setShowModal, modalImgURL }} />}
    </Grid>
  );
};

export default Home;
