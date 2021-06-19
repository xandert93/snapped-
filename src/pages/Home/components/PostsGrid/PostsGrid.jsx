import React from 'react';
import PostCard from './PostCard';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import { useGridScroll } from '../../../../custom-hooks';

const PostsGrid = ({ innerWidth, posts, openModal }) => {
  const classes = useStyles();
  const isMobile = innerWidth < 600;

  const noOfPostsShown = useGridScroll(4, posts.length, 2000);

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
        (doc, idx) =>
          idx < noOfPostsShown && <PostCard key={doc.id} {...{ doc, idx }} />
      )}
    </Grid>
  );
};

export default PostsGrid;
