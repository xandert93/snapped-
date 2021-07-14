import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateFollow } from '../../services/firebase/firestore';
import { setUser } from '../../state/auth/actions';
import { userSelector } from '../../state/selectors';
import useStyles from './styles';

const buttons = {
  follow: ['follow', 'action'],
  following: ['following', 'primary'],
  unfollow: ['unfollow', 'secondary'],
};

export default function FollowButton({ altUser, setAltUser }) {
  const classes = useStyles();

  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const initialIsFollowed = user.following.includes(altUser.username);

  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const [buttonData, setButtonData] = useState(
    initialIsFollowed ? buttons.following : buttons.follow
  );

  const clickHandler = async () => {
    setIsFollowed((isFollowed) => !isFollowed);
    await updateFollow(user, altUser, isFollowed);

    dispatch(
      setUser({
        ...user,
        following: !isFollowed //concat + filter return new arrays
          ? user.following.concat(altUser.username)
          : user.following.filter((username) => username !== altUser.username),
      })
    );

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
