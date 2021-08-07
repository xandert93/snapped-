import { Box, Typography } from '@material-ui/core';
import { WhatshotOutlined, MessageOutlined } from '@material-ui/icons';

import useStyles from './styles';

export default function TileOverlay({ likesCount, commentsCount }) {
  const classes = useStyles();

  return (
    <Box className={classes.overlay}>
      <WhatshotOutlined className={classes.overlayIcon} />
      <Typography variant="h5" component="span">
        {likesCount}
      </Typography>{' '}
      <MessageOutlined className={classes.overlayIcon} />
      <Typography variant="h5" component="span">
        {commentsCount}
      </Typography>
    </Box>
  );
}

//if using event delegation:
//for non-mobile devices, since overlay will block original image,
//"data-index={idx}" was previously needed for their div, enabling modal opening
