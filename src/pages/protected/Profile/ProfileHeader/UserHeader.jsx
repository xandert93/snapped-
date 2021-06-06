import React, { useContext } from 'react';
import ProfileHeader from '.';
import authContext from '../../../../contexts/1.auth/authContext';

const UserHeader = () => {
  const { currentUserDoc } = useContext(authContext);

  return <ProfileHeader userDoc={currentUserDoc} />;
};

export default UserHeader;
