import { Box, CardMedia, Fade, Grow } from '@material-ui/core';
import { Favorite as HeartIcon } from '@material-ui/icons';
import { useContext } from 'react';
import { useState } from 'react';
import { CardContext } from '../../PostCard';
// import { useHistory } from 'react-router-dom';
import useStyles from './styles';

let wasTouchedTwice = false;

export default function PostCardMedia({ url }) {
  const {
    // id,
    username,
    location,
    handleHeartIconClick,
  } = useContext(CardContext);

  const classes = useStyles();
  // const history = useHistory();

  const [showHeart, setShowHeart] = useState(false);

  const handleTouch = (e) => {
    if (!wasTouchedTwice) {
      wasTouchedTwice = true;
      return setTimeout(() => (wasTouchedTwice = false), 250);
    }
    handleHeartIconClick();
    setShowHeart(true);
    setTimeout(setShowHeart, 600, false);
  };

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
