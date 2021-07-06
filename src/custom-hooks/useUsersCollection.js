import { useEffect, useState } from 'react';
import { db } from '../lib/firebase/config';

export const useUsersCollection = () => {
  const users = db.collection('Users').orderBy('createdAt', 'desc');
  const [lookup, setLookup] = useState(null);

  useEffect(() => {
    users.get().then(createLookup);

    async function createLookup({ docs: docRefs }) {
      const pfpLookup = docRefs.reduce((acca, docRef) => {
        const username = docRef.data().username;
        acca[username] = {
          profilePicURL: docRef.data().profilePicURL,
          id: docRef.id,
        };
        return acca;
      }, {});
      setLookup(pfpLookup);
    }
  }, []);

  return lookup;
};
