import { useContext, useEffect, useRef, useState } from 'react';
import authContext from '../contexts/auth/authContext';
import { db } from '../lib/firebase/config';

const useDb = (collectionName, userId = '') => {
  const { currentUserDoc } = useContext(authContext);

  const [allDocRefs, setAllDocRefs] = useState([]);
  const [numOfAvailableDocs, setNumOfAvailableDocs] = useState(0);
  const [docs, setDocs] = useState([]);

  const collectionRef = useRef(
    db.collection(collectionName).orderBy('createdAt', 'desc')
  );
  const allPublicDocsRef = useRef(
    collectionRef.current.where('description.isPrivate', '==', false)
  );
  const userAllDocsRef = useRef(
    collectionRef.current.where('userId', '==', userId)
  );
  const userPublicDocsRef = useRef(
    userAllDocsRef.current.where('description.isPrivate', '==', false)
  );

  function extractDocs({ docs: docRefs }) {
    setNumOfAvailableDocs(docRefs.length);

    let retrievedDocs = [];
    for (let i = 0; i < docRefs.length; i++) {
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

  // to be run when onSnapshot handler updates allDocRefs
  useEffect(() => {
    if (!allDocRefs.length) return;
    if (!allDocRefs[0].data().createdAt) return;

    //"Home"
    if (!userId) {
      allPublicDocsRef.current.get().then(extractDocs);
      return;
    }

    //authenticated user's "CameraRoll" or "OtherUser"
    if (userId) {
      let collectionToQuery =
        userId === currentUserDoc.userId ? userAllDocsRef : userPublicDocsRef;

      collectionToQuery.current.get().then(extractDocs);
      return;
    }
  }, [allDocRefs]);

  return [docs, numOfAvailableDocs];
};

export { useDb };

//when a image uploaded, doc is added, but when onSnapshot initially fires
//timestamp has not been inserted on "createdAt"
//our UI expects to use "createdAt" as soon as docs returned
//thus, cancel first snapshot call if the added document doesn't have "createdAt":
//if (!allDocRefs[0].data().createdAt) return;

//array of LIGHTER docRefs called "docs" destructured from querySnapshot obj
//ideally, i'd just like to add/remove the new/deleted doc to/from the existing docs
//rather than set the docs completely again whenever the database senses a change
//also, when img uploaded and document added to database, onsnapshot here runs
//snapshot returns with new imgdoc - old last (5th) img doc removed from DOM
//also, whilst this is more succicnt than for loop above, for loop might be faster
//could have easily used maps above too, but wanted to use for loop for practice

//extractDocs called with snapshot passed into it. Therefore docRefs destructured from it
