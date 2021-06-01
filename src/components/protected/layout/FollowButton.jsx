import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import authContext from '../../../contexts/auth/authContext';
import { updateFollow } from '../../../services/firebase';

const followBtn = { text: 'follow', color: 'action' };
const followingBtn = { text: 'following', color: 'primary' };
const unfollowBtn = { text: 'unfollow', color: 'secondary' };

const FollowButton = ({ altUserDoc, setAltUserDoc }) => {
  const { currentUserDoc, setCurrentUserDoc } = useContext(authContext);

  const initialIsFollowed = currentUserDoc.following.includes(
    altUserDoc.userId
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
        ? x.following.concat(altUserDoc.userId)
        : x.following.filter((id) => id !== altUserDoc.userId),
    }));

    //only passed by AltUser page, because we need UI to reflect follower +/-
    if (setAltUserDoc) {
      setAltUserDoc((x) => ({
        ...x,
        followers: !isFollowed //concat + filter return new arrays
          ? x.followers.concat(currentUserDoc.userId)
          : x.followers.filter((id) => id !== currentUserDoc.userId),
      }));
    }

    setBtn(!isFollowed ? followingBtn : followBtn);
  };

  return (
    <Button
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
