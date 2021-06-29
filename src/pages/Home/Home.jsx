import { useState } from 'react';
import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { SuggestedProfiles, PostsGrid, ImageModal } from './components';
import { Grid } from '@material-ui/core';

import useStyles from './styles';
import { CreatePostFAB } from '../../components';
import { isCardMedia } from '../../utils/helpers';

const Home = () => {
  const classes = useStyles();
  useSetDocumentTitle('Home');
  const posts = usePostsCollection();

  const [showModal, setShowModal] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const openModal = (e) => {
    if (isCardMedia(e.target)) {
      setModalImgURL(posts[e.target.dataset.postsIdx].url);
      setShowModal(true);
    }
  };

  const closeModal = (e) =>
    !e.target.className.includes('modalImg') && setShowModal(false);

  return (
    <Grid container>
      {/* <SuggestedProfiles /> */}
      {!!posts.length && <PostsGrid posts={posts} openModal={openModal} />}
      {showModal && <ImageModal url={modalImgURL} closeModal={closeModal} />}
    </Grid>
  );
};

export default Home;
