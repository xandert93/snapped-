import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import authContext from '../../../../contexts/auth/authContext';
import { updateFollow } from '../../../../services/firebase';

const SuggestedProfile = ({ suggestedProfileDoc }) => {
  const { currentUserDoc } = useContext(authContext);
  const [isFollowed, setIsFollowed] = useState(false);

  const clickHandler = () => {
    setIsFollowed((x) => !x);
    updateFollow(currentUserDoc, suggestedProfileDoc, isFollowed);
  };

  return (
    !isFollowed && (
      <div style={{ border: '2px grey solid', borderRadius: 5 }}>
        <div>
          {suggestedProfileDoc.username}
          <Button
            size="small"
            onClick={clickHandler}
            variant="contained"
            color="secondary">
            +
          </Button>
        </div>
      </div>
    )
  );
};

export default SuggestedProfile;
