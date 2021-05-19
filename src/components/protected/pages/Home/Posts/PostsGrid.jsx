import React from 'react';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import PostCard from './PostCard';

const PostsGrid = ({ innerWidth, imgDocs, toggleModal }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={innerWidth > 600 ? 2 : 0}
      className={classes.postsContainer}
      onClick={innerWidth > 600 ? toggleModal : null}>
      {imgDocs.map((imgDoc, idx) => (
        <PostCard key={imgDoc.id} {...{ imgDoc, idx }} />
      ))}
    </Grid>
  );
};

export default PostsGrid;
