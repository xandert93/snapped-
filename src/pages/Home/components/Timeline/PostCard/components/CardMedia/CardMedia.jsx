import { Box, CardMedia, Fade, Grow } from '@material-ui/core';
import { Favorite as HeartIcon } from '@material-ui/icons';
// import { useHistory } from 'react-router-dom';
import useStyles from './styles';

export default function PostCardMedia({
  // id,
  url,
  username,
  location,
  handleTouch,
  showHeart,
}) {
  const classes = useStyles();
  // const history = useHistory();
  return (
    <Fade in timeout={4000}>
      <Box className={classes.cardMediaBox}>
        <CardMedia
          className={classes.cardMedia}
          image={url}
          title={`Photo by ${username} @ ${location} with taggedPerson.`}
          // onClick={() => history.push(`/posts/${id}`)}
          onTouchStart={handleTouch}
        />
        <Grow in={showHeart} timeout={1000} unmountOnExit>
          <Box className={classes.heartBox}>
            <HeartIcon />
          </Box>
        </Grow>
      </Box>
    </Fade>
  );
}
