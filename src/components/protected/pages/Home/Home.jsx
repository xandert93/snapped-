import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useSetDocumentTitle, usePostsColl } from '../../../../custom-hooks';
import SuggestedProfiles from '../../layout/SuggestedProfiles';
import ImageModal from './Posts/ImageModal.jsx';
import PostsGrid from './Posts/PostsGrid';
import useStyles from './Posts/styles';

const Home = ({ innerWidth }) => {
  const classes = useStyles();
  useSetDocumentTitle('Home');
  const [numOfPostsShown, setNumOfPostsShown] = useState(4);
  const [posts, numOfPosts] = usePostsColl();

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
      <PostsGrid {...{ innerWidth, posts, numOfPostsShown, toggleModal }} />

      <SuggestedProfiles />

      {posts.length > 0 && (
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            //ASS, if availDocs !% 4, error will be thrown at end. Need to fix
            disabled={numOfPostsShown === numOfPosts}
            onClick={() => setNumOfPostsShown((x) => x + 4)}>
            Fetch more
          </Button>
        </div>
      )}

      {showModal && <ImageModal {...{ setShowModal, modalImgURL }} />}
    </Grid>
  );
};

export default Home;
