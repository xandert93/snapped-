import { useEffect, useState } from 'react';
import { getUserDocFromDb } from '../services/firebase';

const useGetCurrentUserDoc = (currentUser) => {
  const [currentUserDoc, setCurrentUserDoc] = useState(null);

  useEffect(() => {
    if (!currentUser) return setCurrentUserDoc(null);
    getUserDocFromDb(currentUser.displayName).then((userDoc) =>
      setCurrentUserDoc(userDoc)
    );
  }, [currentUser]);

  return [currentUserDoc, setCurrentUserDoc];
};

export { useGetCurrentUserDoc };
