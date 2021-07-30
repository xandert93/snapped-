import { Box, CardActions, IconButton, Typography } from '@material-ui/core';
import {
  Favorite as FilledHeartIcon,
  FavoriteBorderTwoTone as OutlinedHeartIcon,
  ChatBubbleOutline as OutlinedChatIcon,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { userUsernameSelector } from '../../../../../../../state/auth/selectors';
import useStyles from './styles';

export default function PostCardActions({
  handleHeartClick,
  isLikedByUser,
  likesCount,
  commentsCount,
  commentInputRef,
}) {
  const classes = useStyles();

  return (
    <CardActions className={classes.cardActions}>
      <Box>
        <IconButton onClick={handleHeartClick}>
          {isLikedByUser ? (
            <FilledHeartIcon color="secondary" />
          ) : (
            <OutlinedHeartIcon color="primary" />
          )}
        </IconButton>

        <Typography variant="caption" component="p">
          {likesCount} like{likesCount !== 1 && 's'}
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
