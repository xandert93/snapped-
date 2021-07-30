import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '../../../../components';
import { fbGetUser } from '../../../../services/firebase/firestore/users';

export default function AltUserHeader() {
  const { username } = useParams();

  const [altUser, setAltUser] = useState(null);
  useEffect(() => {
    fbGetUser(null, username).then(setAltUser);
  }, []);

  const postCount = useSelector((state) => state.posts.altUser.length);

  return (
    altUser && (
      <ProfileHeader
        profile={altUser}
        setProfile={setAltUser}
        postCount={postCount}
      />
    )
  );
}
