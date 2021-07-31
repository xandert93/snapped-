import { Box, CardActions, IconButton, Typography } from '@material-ui/core';
import {
  Favorite as FilledHeartIcon,
  FavoriteBorderTwoTone as OutlinedHeartIcon,
  ChatBubbleOutline as OutlinedChatIcon,
} from '@material-ui/icons';
import { useContext } from 'react';
import { CardContext } from '../../PostCard';

import useStyles from './styles';

export default function PostCardActions() {
  const { handleHeartIconClick, uiIsLikedByUser, uiLikesCount, commentsCount, commentInputRef } =
    useContext(CardContext);

  const classes = useStyles();

  return (
    <CardActions className={classes.cardActions}>
      <Box>
        <IconButton onClick={handleHeartIconClick}>
          {uiIsLikedByUser ? <FilledHeartIcon color="secondary" /> : <OutlinedHeartIcon color="primary" />}
        </IconButton>

        <Typography variant="caption" component="p">
          {uiLikesCount} like{uiLikesCount !== 1 && 's'}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={() => commentInputRef.current.focus()}>
          <OutlinedChatIcon color="primary" className={classes.commentSVG} />
        </IconButton>
        <Typography variant="caption" component="p">
          {commentsCount} comment
          {commentsCount !== 1 && 's'}
        </Typography>
      </Box>
    </CardActions>
  );
}
