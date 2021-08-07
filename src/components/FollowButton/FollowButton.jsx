import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fbUpdateAltUserFollowers, fbUpdateUserFollowing } from '../../services/firebase/firestore/users';
import { updateUserFollowing } from '../../state/auth/actions';
import { userFollowingSelector, userIdSelector, selectUserUsername } from '../../state/auth/selectors';
import useStyles from './styles';

const buttons = {
  follow: ['follow', 'action'],
  following: ['following', 'primary'],
  unfollow: ['unfollow', 'secondary'],
};

export default function FollowButton({ altUser, setAltUser }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const userUsername = useSelector(selectUserUsername);
  const userFollowing = useSelector(userFollowingSelector);

  const initialIsAltUserFollowed = userFollowing.includes(altUser.username);

  const [isAltUserFollowed, setIsAltUserFollowed] = useState(initialIsAltUserFollowed);
  const [buttonData, setButtonData] = useState(initialIsAltUserFollowed ? buttons.following : buttons.follow);

  const clickHandler = async () => {
    await fbUpdateUserFollowing(userId, altUser.username, isAltUserFollowed);
    await fbUpdateAltUserFollowers(altUser.id, userUsername, isAltUserFollowed);

    setIsAltUserFollowed((isAltUserFollowed) => !isAltUserFollowed);
    dispatch(updateUserFollowing(altUser.username, isAltUserFollowed));

    //only passed by AltUser page, because we need UI to reflect follower +/-
    if (setAltUser) {
      setAltUser((x) => ({
        ...x,
        followers: !isAltUserFollowed //concat + filter return new arrays
          ? x.followers.concat(userUsername)
          : x.followers.filter((username) => username !== userUsername),
      }));
    }

    setButtonData(!isAltUserFollowed ? buttons.following : buttons.follow);
  };

  return (
    userUsername !== altUser.username && (
      <Button
        className={classes.followBtn}
        size="small"
        onClick={clickHandler}
        onMouseEnter={() => isAltUserFollowed && setButtonData(buttons.unfollow)}
        onMouseLeave={() => isAltUserFollowed && setButtonData(buttons.following)}
        variant="contained"
        color={buttonData[1]}>
        {buttonData[0]}
      </Button>
    )
  );
}
