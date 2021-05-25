import { useContext, useEffect, useRef, useState } from 'react';
import authContext from '../contexts/auth/authContext';
import { db } from '../firebase/config';

const useDb = (collectionName, numOfRequestedDocs, userId = '') => {
  const { currentUser } = useContext(authContext);

  const [allDocRefs, setAllDocRefs] = useState([]);
  const [numOfAvailableDocs, setNumOfAvailableDocs] = useState(0);
  const [docs, setDocs] = useState([]);

  const collectionRef = useRef(
    db.collection(collectionName).orderBy('createdAt', 'desc')
  );

  const isPublicCollectionRef = useRef(
    collectionRef.current.where('description.isPrivate', '==', false)
  );

  const userEntireCollectionRef = useRef(
    collectionRef.current.where('userId', '==', userId)
  );

  const userPublicCollectionRef = useRef(
    userEntireCollectionRef.current.where('description.isPrivate', '==', false)
  );

  function extractDocs(docRefs) {
    setNumOfAvailableDocs(docRefs.length);

    let retrievedDocs = [];
    for (let i = 0; i < numOfRequestedDocs; i++) {
      retrievedDocs.push({ ...docRefs[i].data(), id: docRefs[i].id });
    }
    setDocs(retrievedDocs);
  }

  // set up a single onSnapshot listener that fires with qS of entire collection
  useEffect(() => {
    const unsub = collectionRef.current.onSnapshot(({ docs: docRefs }) =>
      setAllDocRefs(docRefs)
    );
    return unsub;
  }, [collectionRef]);

  // to be run when onSnapshot handler updates allDocRefs or user has requested more docs
  useEffect(() => {
    if (!allDocRefs.length) return;
    if (!allDocRefs[0].data().createdAt) return;

    //"Home"
    if (!userId) {
      isPublicCollectionRef.current
        .get()
        .then(({ docs: publicDocRefs }) => extractDocs(publicDocRefs));
      return;
    }

    //"OtherUser" and authenticated user's "CameraRoll"
    if (userId) {
      let collectionToQuery =
        userId !== currentUser.uid
          ? userPublicCollectionRef
          : userEntireCollectionRef;

      collectionToQuery.current
        .get()
        .then(({ docs: usersDocRefs }) => extractDocs(usersDocRefs));
      return;
    }

    //but this will never get run ASS, as the first if statement runs instead
    else {
      setDocs(
        allDocRefs.map((docRef) => ({
          ...docRef.data(),
          id: docRef.id,
        }))
      );
    }
  }, [allDocRefs, numOfRequestedDocs]);

  return [docs, numOfAvailableDocs];
};

export default useDb;
