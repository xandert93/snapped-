import { Box, Typography } from '@material-ui/core';
import { FavoriteBorder, MessageOutlined } from '@material-ui/icons';

import useStyles from './styles';

export default function TileOverlay({ noOfLikes, noOfComments }) {
  const classes = useStyles();

  return (
    <Box className={classes.overlay}>
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
}

//if using event delegation:
//for non-mobile devices, since overlay will block original image,
//"data-index={idx}" was previously needed for their div, enabling modal opening
