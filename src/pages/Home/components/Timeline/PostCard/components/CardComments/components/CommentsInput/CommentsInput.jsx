import { IconButton, Input, InputAdornment } from '@material-ui/core';
import { Create as PenIcon } from '@material-ui/icons';
import useStyles from './styles';

export default function CommentsInput({
  commentsCount,
  commentText,
  handleInputChange,
  handleNewComment,
  commentInputRef,
}) {
  const classes = useStyles();
  return (
    <Input
      className={classes.commentsInput}
      placeholder={
        !commentsCount ? 'Be the first to comment!' : 'Leave a comment!'
      }
      inputRef={commentInputRef}
      value={commentText}
      onChange={handleInputChange}
      onKeyUp={(e) => e.key === 'Enter' && commentText && handleNewComment()}
      endAdornment={
        <InputAdornment>
          <IconButton
            color="secondary"
            onClick={handleNewComment}
            disabled={!commentText}>
            <PenIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
