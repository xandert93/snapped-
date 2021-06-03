import React from 'react';
import PostCard from './PostCard';
import useStyles from './styles';
import { Grid } from '@material-ui/core';

const PostsGrid = ({ innerWidth, posts, numOfPostsShown, toggleModal }) => {
  const classes = useStyles();
  const isMobile = innerWidth < 600;

  return (
    <Grid
      item
      sm={9}
      lg={10}
      container
      spacing={isMobile ? 0 : 2}
      className={classes.postsContainer}
      onClick={isMobile ? null : toggleModal}>
      {posts.map(
        (doc, idx) =>
          idx < numOfPostsShown && <PostCard key={doc.id} {...{ doc, idx }} />
      )}
    </Grid>
  );
};

export default PostsGrid;
