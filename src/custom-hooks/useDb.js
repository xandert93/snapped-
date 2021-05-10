import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';

const useDb = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const collectionRef = useRef(db.collection(collectionName));

  useEffect(() => {
    const unsub = collectionRef.current
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        setDocs(
          querySnapshot.docs.map((docRef) => ({
            ...docRef.data(),
            id: docRef.id,
          }))
        );
      });
    return unsub;
  }, [collectionRef]);

  return docs;
};

export default useDb;
