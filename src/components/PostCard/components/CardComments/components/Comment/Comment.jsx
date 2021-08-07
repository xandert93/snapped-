import { Box, Grow, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { buildProfilePath } from '../../../../../../constants/routes';
import { selectUserUsername } from '../../../../../../state/auth/selectors';
import { deletePostComment } from '../../../../../../state/posts/actions';
import { Link } from '../../../../../Link';
import { useCard } from '../../../../context';

export default function Comment({ comment }) {
  const { id, handlePageChange, calcPageCount } = useCard();

  const dispatch = useDispatch();
  const userUsername = useSelector(selectUserUsername);

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
