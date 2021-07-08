import { useState } from 'react';
import {
  usePostsCollection,
  useSetDocumentTitle,
  useUsersCollection,
} from '../../custom-hooks';
import { SuggestedProfiles, PostsGrid, ImageModal } from './components';
import { Fade, Grid, Grow, Zoom } from '@material-ui/core';

import useStyles from './styles';
import { CreatePostFAB, SlidingModal } from '../../components';
import { isCardMedia } from '../../utils/helpers';
import { UpdatePostForm } from '../Profile/components';
import { useContext } from 'react';
import { appContext } from '../../contexts/3.app/appContext';

const Home = () => {
  const classes = useStyles();
  useSetDocumentTitle('Home');

  const { homePosts, setHomePosts } = useContext(appContext);

  // const openModal = (e) => {
  //   if (isCardMedia(e.target)) {
  //     setPostToUpdate(homePosts[e.target.dataset.postsIdx]);
  //     setShowModal(true);
  //   }
  // };

  // const closeModal = (e) =>
  //   !e.target.className.includes('modalImg') && setShowModal(false);

  return (
    <Grid container>
      {/* <SuggestedProfiles /> */}
      {/* changes user doc when altuser followed. usepostscoll fires again, returns new docs */}

      <PostsGrid
        posts={homePosts}
        setPosts={setHomePosts}
        // openModal={openModal}
      />

      {/* {showModal && (
          <ImageModal url={postToUpdate.url} closeModal={closeModal} />
        )} */}
    </Grid>
  );
};

export default Home;
