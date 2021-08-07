import { Box, CardMedia, Fade, Grow } from '@material-ui/core';
import { Whatshot as FlameIcon } from '@material-ui/icons';

import { useState } from 'react';
import { useCard } from '../../context';
// import { useHistory } from 'react-router-dom';
import useStyles from './styles';

let wasTouchedTwice = false;

export default function PostCardMedia({ url }) {
  const {
    // id,
    username,
    location,
    handleFlameClick,
    uiIsLikedByUser,
  } = useCard();

  const classes = useStyles({ uiIsLikedByUser });
  // const history = useHistory();

  const [showFlame, setShowFlame] = useState(false);

  const handleTouch = (e) => {
    if (!wasTouchedTwice) {
      wasTouchedTwice = true;
      return setTimeout(() => (wasTouchedTwice = false), 250);
    }
    handleFlameClick();
    setShowFlame(true);
    setTimeout(setShowFlame, 600, false);
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
        <Grow in={showFlame} timeout={1000} unmountOnExit>
          <Box className={classes.heartBox}>
            <FlameIcon className={classes.flameSVG} />
          </Box>
        </Grow>
      </Box>
    </Fade>
  );
}
