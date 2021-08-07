import { useCard } from '../../context';
import { Box, CardActions, IconButton, Typography } from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, Whatshot as FlameIcon } from '@material-ui/icons';
import useStyles from './styles';

import { numOf } from '../../../../utils/helpers';

export default function PostCardActions() {
  const { handleFlameClick, uiIsLikedByUser, uiLikesCount, commentsCount, commentInputRef } = useCard();

  const classes = useStyles({ uiIsLikedByUser });

  return (
    <CardActions className={classes.cardActions}>
      <Box>
        <IconButton onClick={handleFlameClick}>
          <FlameIcon className={classes.flameSVG} />
        </IconButton>
        <Typography variant="caption" component="p">
          {numOf(uiLikesCount, "that's hot")}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={() => commentInputRef.current.focus()} disableRipple>
          <ChatIcon color="primary" className={classes.commentSVG} />
        </IconButton>
        <Typography variant="caption" component="p">
          {numOf(commentsCount, 'comment')}
        </Typography>
      </Box>
    </CardActions>
  );
}
