import { CardContent } from '@material-ui/core';
import { Comment, CommentsPagination, CommentsInput } from './components';
import useStyles from './styles';

export default function CardComments({
  commentsCount,
  comments,
  sliceIdx,
  handleCommentDoubleClick,
  userUsername,
  handlePageChange,
  pageNum,
  handleNewComment,
  commentText,
  handleInputChange,
  commentInputRef,
  getPageCount,
  maxCommentsShown,
}) {
  const classes = useStyles();

  const getDisplayedComments = () =>
    comments
      .slice(sliceIdx - maxCommentsShown, sliceIdx)
      .map((comment, idx) => (
        <Comment
          key={`${comment.username}-${idx}`}
          {...{ comment, handleCommentDoubleClick, userUsername }}
        />
      ));

  return (
    <CardContent className={classes.cardComments}>
      {!!commentsCount && getDisplayedComments()}
      {commentsCount > maxCommentsShown && (
        <CommentsPagination {...{ handlePageChange, pageNum, getPageCount }} />
      )}
      <CommentsInput
        {...{
          commentsCount,
          commentText,
          handleInputChange,
          handleNewComment,
          commentInputRef,
        }}
      />
    </CardContent>
  );
}
