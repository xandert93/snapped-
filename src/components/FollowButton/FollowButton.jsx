import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';

import { updateFollow } from '../../services/firebase';
import useStyles from './styles';

const buttons = {
  follow: ['follow', 'action'],
  following: ['following', 'primary'],
  unfollow: ['unfollow', 'secondary'],
};

export default function FollowButton({ altUserDoc, setAltUserDoc }) {
  const classes = useStyles();

  const { currentUserDoc, setCurrentUserDoc } = useContext(authContext);

  const initialIsFollowed = currentUserDoc.following.includes(
    altUserDoc.username
  );

  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const [buttonData, setButtonData] = useState(
    initialIsFollowed ? buttons.following : buttons.follow
  );

  const clickHandler = async () => {
    setIsFollowed((isFollowed) => !isFollowed);
    await updateFollow(currentUserDoc, altUserDoc, isFollowed);

    setCurrentUserDoc((x) => ({
      ...x,
      following: !isFollowed //concat + filter return new arrays
        ? x.following.concat(altUserDoc.username)
        : x.following.filter((username) => username !== altUserDoc.username),
    }));

    //only passed by AltUser page, because we need UI to reflect follower +/-
    if (setAltUserDoc) {
      setAltUserDoc((x) => ({
        ...x,
        followers: !isFollowed //concat + filter return new arrays
          ? x.followers.concat(currentUserDoc.username)
          : x.followers.filter(
              (username) => username !== currentUserDoc.username
            ),
      }));
    }

    setButtonData(!isFollowed ? buttons.following : buttons.follow);
  };

  return (
    <Button
      className={classes.followBtn}
      size="small"
      onClick={clickHandler}
      onMouseEnter={() => isFollowed && setButtonData(buttons.unfollow)}
      onMouseLeave={() => isFollowed && setButtonData(buttons.following)}
      variant="contained"
      color={buttonData[1]}>
      {buttonData[0]}
    </Button>
  );
}
