import { Box, Typography } from '@material-ui/core';
import { FavoriteBorder, MessageOutlined } from '@material-ui/icons';
import React from 'react';
import useStyles from './styles';

const TileOverlay = ({ idx, noOfLikes, noOfComments }) => {
  const classes = useStyles();

  return (
    <Box className={classes.overlay} data-post-idx={idx}>
      <FavoriteBorder className={classes.overlayIcon} />
      <Typography variant="h5" component="span">
        {noOfLikes}
      </Typography>{' '}
      <MessageOutlined className={classes.overlayIcon} />
      <Typography variant="h5" component="span">
        {noOfComments}
      </Typography>
    </Box>
  );
};

export default TileOverlay;

//for non-mobile devices, since overlay will block original image,
//"data-index={idx}" is needed for their div, enabling modal opening
