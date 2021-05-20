import React from 'react';
import PostCard from './PostCard';
import useStyles from './styles';
import { Grid } from '@material-ui/core';

const PostsGrid = ({ innerWidth, imageDocs, toggleModal }) => {
  const classes = useStyles();
  const isMobile = innerWidth < 600;

  return (
    <Grid
      container
      spacing={isMobile ? 0 : 2}
      className={classes.postsContainer}
      onClick={isMobile ? null : toggleModal}>
      {imageDocs.map((doc, idx) => (
        <PostCard key={doc.id} {...{ doc, idx }} />
      ))}
    </Grid>
  );
};

export default PostsGrid;
