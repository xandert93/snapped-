import { Box, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { appContext } from '../../contexts/3.app/appContext';

import { ImageBoxOverlay } from './ImageBoxOverlay';
import useStyles from './styles';

const ImageGrid = ({ posts, noOfReqdPosts, clickHandler }) => {
  const classes = useStyles();
  const { innerWidth } = useContext(appContext);

  const isMobile = innerWidth < 960;
  return (
    !!posts.length && (
      <Grid container onClick={clickHandler}>
        {posts.map(
          ({ id, username, url, likes, comments }, idx) =>
            idx < noOfReqdPosts && (
              <Grid key={id} item xs={4} md={3}>
                <Box className={classes.imageBox}>
                  <img
                    src={url}
                    data-index={idx}
                    alt={`${username}'s post`}
                    className={classes.image}
                  />
                  {!isMobile && (
                    <ImageBoxOverlay
                      idx={idx}
                      noOfLikes={likes.length}
                      noOfComments={comments.length}
                    />
                  )}
                </Box>
              </Grid>
            )
        )}
      </Grid>
    )
  );
};

export default ImageGrid;
