import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';

const useDb = (collectionName, numOfRequestedDocs) => {
  const [docs, setDocs] = useState([]);
  const collectionRef = useRef(db.collection(collectionName));

  useEffect(() => {
    const unsub = collectionRef.current
      .orderBy('createdAt', 'desc')
      .onSnapshot(({ docs: docRefs }) => {
        //when a image uploaded, doc is added, but when onSnapshot initially fires
        //timestamp has not been inserted on "createdAt"
        //our UI expects to use "createdAt" as soon as docs returned
        //thus, cancel first snapshot call if the added document doesn't have "createdAt":
        if (!docRefs[0].data().createdAt) return;
        //array of docRefs called "docs" destructured from querySnapshot obj
        //ideally, i'd just like to add/remove the new/deletd doc to/from the existing docs
        //rather than set the docs completely again whenever the database senses a change
        //also, when img uploaded and document added to database, onsnapshot here runs
        //snapshot returns with new imgdoc - old last (5th) img doc removed from DOM
        if (numOfRequestedDocs) {
          let retrievedDocs = [];
          for (let i = 0; i < numOfRequestedDocs; i++) {
            retrievedDocs.push({ ...docRefs[i].data(), id: docRefs[i].id });
          }
          setDocs(retrievedDocs);
        } else {
          setDocs(
            docRefs.map((docRef) => ({
              ...docRef.data(),
              id: docRef.id,
            }))
          );
        }
      });
    return unsub;
  }, [collectionRef, numOfRequestedDocs]);

  return docs;
};

export default useDb;
