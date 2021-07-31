import { Box, Grow, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buildProfilePath } from '../../../../../../constants/routes';
import { userUsernameSelector } from '../../../../../../state/auth/selectors';
import { deletePostComment } from '../../../../../../state/posts/actions';
import { Link } from '../../../../../Link';
import { CardContext } from '../../../../PostCard';

export default function Comment({ comment }) {
  const { id, handlePageChange, calcPageCount } = useContext(CardContext);

  const dispatch = useDispatch();
  const userUsername = useSelector(userUsernameSelector);

  const handleCommentDoubleClick = async (commentToDelete) => {
    dispatch(deletePostComment(id, commentToDelete));
    handlePageChange(null, calcPageCount(-1));
  };

  return (
    <Grow in timeout={800}>
      <Box>
        <Link to={buildProfilePath(comment.username)}>
          <strong>{comment.username}</strong>
        </Link>{' '}
        <Typography
          onDoubleClick={comment.username === userUsername ? (e) => handleCommentDoubleClick(comment) : null}
          variant="body2"
          component="span"
          gutterBottom>
          {comment.text}
        </Typography>
      </Box>
    </Grow>
  );
}
