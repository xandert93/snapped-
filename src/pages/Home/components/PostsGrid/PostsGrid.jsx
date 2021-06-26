import React from 'react';
import PostCard from './PostCard';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import { useGridScroll } from '../../../../custom-hooks';
import { useContext } from 'react';
import { appContext } from '../../../../contexts/3.app/appContext';

const PostsGrid = ({ posts, openModal }) => {
  const classes = useStyles();
  const { innerWidth } = useContext(appContext);
  const isMobile = innerWidth < 600;
  const initialNoOfPostsShown = isMobile ? 4 : 8;

  const noOfPostsShown = useGridScroll(
    initialNoOfPostsShown,
    posts.length,
    2000
  );

  return (
    <Grid
      item
      sm={9}
      lg={10}
      container
      spacing={isMobile ? 0 : 2}
      className={classes.postsContainer}
      onClick={isMobile ? null : openModal}>
      {posts.map(
        (post, idx) =>
          idx < noOfPostsShown && (
            <PostCard key={post.id} {...{ post, idx, isMobile }} />
          )
      )}
    </Grid>
  );
};

export default PostsGrid;
