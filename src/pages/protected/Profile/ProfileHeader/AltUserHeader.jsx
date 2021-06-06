import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProfileHeader from '.';
import { getUserDocFromDb } from '../../../../services/firebase';

const AltUserHeader = () => {
  const { username } = useParams();

  const [altUserDoc, setAltUserDoc] = useState(null);
  useEffect(() => {
    getUserDocFromDb(null, username).then(setAltUserDoc);
  }, []);

  return (
    altUserDoc && (
      <ProfileHeader userDoc={altUserDoc} setUserDoc={setAltUserDoc} />
    )
  );
};

export default AltUserHeader;
