import { IconButton, Input, InputAdornment } from '@material-ui/core';
import { Create as PenIcon } from '@material-ui/icons';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostComment } from '../../../../../../state/posts/actions';
import { useCard } from '../../../../context';
import useStyles from './styles';

export default function CommentsInput({ commentInputRef }) {
  const { id, commentsCount, calcPageCount, handlePageChange } = useCard();
  const classes = useStyles();

  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = async () => {
    dispatch(createPostComment(id, commentText));
    setCommentText('');
    handlePageChange(null, calcPageCount(1));
  };

  return (
    <Input
      className={classes.commentsInput}
      placeholder={!commentsCount ? 'Be the first to comment!' : 'Leave a comment!'}
      inputRef={commentInputRef}
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      onKeyUp={(e) => e.key === 'Enter' && commentText && handleCommentSubmit()}
      endAdornment={
        <InputAdornment>
          <IconButton color="secondary" onClick={handleCommentSubmit} disabled={!commentText}>
            <PenIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
