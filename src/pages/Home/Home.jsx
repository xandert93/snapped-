import { useState } from 'react';
import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { SuggestedProfiles, PostsGrid, ImageModal } from './components';
import { Grid } from '@material-ui/core';

import useStyles from './styles';
import { CreatePostButton } from '../../components';

const Home = () => {
  const classes = useStyles();
  useSetDocumentTitle('Home');
  const posts = usePostsCollection();

  const [showModal, setShowModal] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const openModal = (e) => {
    if (e.target.classList.contains('MuiCardMedia-root')) {
      setModalImgURL(posts[e.target.dataset.postsIdx].url);
      setShowModal(true);
    }
  };

  const closeModal = (e) => {
    if (e.target.className.includes('modalImg')) return;
    setShowModal(false);
  };

  return (
    <Grid container>
      {!!posts.length && <PostsGrid posts={posts} openModal={openModal} />}
      <SuggestedProfiles />
      {showModal && <ImageModal url={modalImgURL} closeModal={closeModal} />}
      <CreatePostButton />
    </Grid>
  );
};

export default Home;
