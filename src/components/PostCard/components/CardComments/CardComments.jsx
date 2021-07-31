import { CardContent } from '@material-ui/core';
import { useContext } from 'react';
import { CardContext } from '../../PostCard';
import { Comment, CommentsPagination, CommentsInput } from './components';
import useStyles from './styles';

export default function CardComments({ comments }) {
  const { commentsCount, pageSliceIndex, handlePageChange, pageNum, calcPageCount, commentInputRef, maxCommentsShown } =
    useContext(CardContext);

  const classes = useStyles();

  const getDisplayedComments = () =>
    comments
      .slice(pageSliceIndex - maxCommentsShown, pageSliceIndex)
      .map((comment, idx) => <Comment key={idx} comment={comment} />);

  return (
    <CardContent className={classes.cardComments}>
      {!!commentsCount && getDisplayedComments()}
      <CommentsPagination handlePageChange={handlePageChange} pageNum={pageNum} calcPageCount={calcPageCount} />
      <CommentsInput commentInputRef={commentInputRef} />
    </CardContent>
  );
}
