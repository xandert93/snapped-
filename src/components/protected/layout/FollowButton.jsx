import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import authContext from '../../../contexts/auth/authContext';
import { updateFollow } from '../../../services/firebase';
import useStyles from './styles';

const followBtn = { text: 'follow', color: 'action' };
const followingBtn = { text: 'following', color: 'primary' };
const unfollowBtn = { text: 'unfollow', color: 'secondary' };

const FollowButton = ({ altUserDoc, setAltUserDoc }) => {
  const classes = useStyles();

  const { currentUserDoc, setCurrentUserDoc } = useContext(authContext);

  const initialIsFollowed = currentUserDoc.following.includes(
    altUserDoc.username
  );

  const initialBtn = initialIsFollowed ? followingBtn : followBtn;

  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const [btn, setBtn] = useState(initialBtn);

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

    setBtn(!isFollowed ? followingBtn : followBtn);
  };

  return (
    <Button
      className={classes.followBtn}
      size="small"
      onClick={clickHandler}
      onMouseEnter={() => {
        if (!isFollowed) return;
        setBtn(unfollowBtn);
      }}
      onMouseLeave={() => {
        if (!isFollowed) return;
        setBtn(followingBtn);
      }}
      variant="contained"
      color={btn.color}>
      {btn.text}
    </Button>
  );
};

export default FollowButton;
