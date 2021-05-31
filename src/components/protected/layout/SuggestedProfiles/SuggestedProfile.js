import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../../../contexts/auth/authContext';
import { updateFollow } from '../../../../services/firebase';

const followBtn = { text: 'follow', color: 'action' };
const followingBtn = { text: 'following', color: 'primary' };
const unfollowBtn = { text: 'unfollow', color: 'secondary' };

const SuggestedProfile = ({ suggestedProfileDoc }) => {
  const { currentUserDoc } = useContext(authContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [btn, setBtn] = useState(followBtn);

  const clickHandler = () => {
    setIsFollowed((x) => !x);
    updateFollow(currentUserDoc, suggestedProfileDoc, isFollowed);
    setBtn(!isFollowed ? followingBtn : followBtn);
  };

  return (
    <div style={{ border: '2px grey solid', borderRadius: 5 }}>
      <div>
        <Link to={`/p/${suggestedProfileDoc.username}`}>
          {suggestedProfileDoc.username}
        </Link>
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
      </div>
    </div>
  );
};

export default SuggestedProfile;
