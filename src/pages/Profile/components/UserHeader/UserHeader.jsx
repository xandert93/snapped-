import React, { useContext } from 'react';
import { ProfileHeader } from '../../../../components';
import { authContext } from '../../../../contexts/1.auth/authContext';

const UserHeader = () => {
  const { user } = useContext(authContext);

  return <ProfileHeader profile={user} />;
};

export default UserHeader;
