import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fbUpdateAltUserFollowers,
  fbUpdateUserFollowing,
} from '../../services/firebase/firestore';
import { updateUserFollowing } from '../../state/auth/actions';
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

  const initialIsAltUserFollowed = user.following.includes(altUser.username);

  const [isAltUserFollowed, setIsAltUserFollowed] = useState(
    initialIsAltUserFollowed
  );
  const [buttonData, setButtonData] = useState(
    initialIsAltUserFollowed ? buttons.following : buttons.follow
  );

  const clickHandler = async () => {
    await fbUpdateUserFollowing(user.id, altUser.username, isAltUserFollowed);
    await fbUpdateAltUserFollowers(
      altUser.id,
      user.username,
      isAltUserFollowed
    );

    setIsAltUserFollowed((isAltUserFollowed) => !isAltUserFollowed);
    dispatch(updateUserFollowing(altUser.username, isAltUserFollowed));

    //only passed by AltUser page, because we need UI to reflect follower +/-
    if (setAltUser) {
      setAltUser((x) => ({
        ...x,
        followers: !isAltUserFollowed //concat + filter return new arrays
          ? x.followers.concat(user.username)
          : x.followers.filter((username) => username !== user.username),
      }));
    }

    setButtonData(!isAltUserFollowed ? buttons.following : buttons.follow);
  };

  return (
    user.username !== altUser.username && (
      <Button
        className={classes.followBtn}
        size="small"
        onClick={clickHandler}
        onMouseEnter={() =>
          isAltUserFollowed && setButtonData(buttons.unfollow)
        }
        onMouseLeave={() =>
          isAltUserFollowed && setButtonData(buttons.following)
        }
        variant="contained"
        color={buttonData[1]}>
        {buttonData[0]}
      </Button>
    )
  );
}
