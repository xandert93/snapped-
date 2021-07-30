import { Box, Typography } from '@material-ui/core';
import { Link } from '../../../../../../../../../components';
import { buildProfilePath } from '../../../../../../../../../constants/routes';

export default function Comment({
  comment,
  handleCommentDoubleClick,
  userUsername,
}) {
  return (
    <Box>
      <Link to={buildProfilePath(comment.username)}>
        <strong>{comment.username}</strong>
      </Link>{' '}
      <Typography
        onDoubleClick={
          comment.username === userUsername
            ? (e) => handleCommentDoubleClick(comment)
            : null
        }
        variant="body2"
        component="span"
        gutterBottom>
        {comment.text}
      </Typography>
    </Box>
  );
}
