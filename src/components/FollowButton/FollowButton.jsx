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

export default function FollowButton({ altUser, setAltUser }) {
  const classes = useStyles();

  const { user, setUser } = useContext(authContext);

  const initialIsFollowed = user.following.includes(altUser.username);

  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const [buttonData, setButtonData] = useState(
    initialIsFollowed ? buttons.following : buttons.follow
  );

  const clickHandler = async () => {
    setIsFollowed((isFollowed) => !isFollowed);
    await updateFollow(user, altUser, isFollowed);

    setUser((x) => ({
      ...x,
      following: !isFollowed //concat + filter return new arrays
        ? x.following.concat(altUser.username)
        : x.following.filter((username) => username !== altUser.username),
    }));

    //only passed by AltUser page, because we need UI to reflect follower +/-
    if (setAltUser) {
      setAltUser((x) => ({
        ...x,
        followers: !isFollowed //concat + filter return new arrays
          ? x.followers.concat(user.username)
          : x.followers.filter((username) => username !== user.username),
      }));
    }

    setButtonData(!isFollowed ? buttons.following : buttons.follow);
  };

  return (
    user.username !== altUser.username && (
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
    )
  );
}
