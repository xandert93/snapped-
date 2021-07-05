import React, { useContext } from 'react';
import { ProfileHeader } from '../../../../components';
import { authContext } from '../../../../contexts/1.auth/authContext';

const UserHeader = () => {
  const { currentUser } = useContext(authContext);

  return <ProfileHeader userDoc={currentUser} />;
};

export default UserHeader;
