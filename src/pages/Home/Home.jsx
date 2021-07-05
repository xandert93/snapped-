import { useState } from 'react';
import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { SuggestedProfiles, PostsGrid, ImageModal } from './components';
import { Fade, Grid, Grow, Zoom } from '@material-ui/core';

import useStyles from './styles';
import { CreatePostFAB, SlidingModal } from '../../components';
import { isCardMedia } from '../../utils/helpers';
import { UpdatePostForm } from '../Profile/components';

const Home = () => {
  const classes = useStyles();
  useSetDocumentTitle('Home');
  const posts = usePostsCollection();

  // const openModal = (e) => {
  //   if (isCardMedia(e.target)) {
  //     setPostToEdit(posts[e.target.dataset.postsIdx]);
  //     setShowModal(true);
  //   }
  // };

  // const closeModal = (e) =>
  //   !e.target.className.includes('modalImg') && setShowModal(false);

  return (
    <Grid container>
      {/* <SuggestedProfiles /> */}

      <PostsGrid
        posts={posts}
        // openModal={openModal}
      />

      {/* {showModal && (
          <ImageModal url={postToEdit.url} closeModal={closeModal} />
        )} */}
    </Grid>
  );
};

export default Home;
