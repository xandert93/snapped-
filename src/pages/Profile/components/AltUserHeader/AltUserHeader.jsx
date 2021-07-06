import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../../../../components';
import { getUserDocFromDb } from '../../../../services/firebase';

const AltUserHeader = () => {
  const { username } = useParams();

  const [altUser, setAltUser] = useState(null);
  useEffect(() => {
    getUserDocFromDb(null, username).then(setAltUser);
  }, []);

  return altUser && <ProfileHeader profile={altUser} setProfile={setAltUser} />;
};

export default AltUserHeader;
