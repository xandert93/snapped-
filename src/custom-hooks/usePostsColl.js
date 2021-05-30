import { useContext, useEffect, useState } from 'react';
import authContext from '../contexts/auth/authContext';
import { db } from '../lib/firebase/config';

export const usePostsColl = (username = '') => {
  const { currentUserDoc } = useContext(authContext);

  const [allDocRefs, setAllDocRefs] = useState([]);
  const [numOfAvailableDocs, setNumOfAvailableDocs] = useState(0);
  const [docs, setDocs] = useState([]);

  //Could have used refs here to prevent recreation on re-render, but felt like overkill
  const posts = db.collection('Image URL Data').orderBy('createdAt', 'desc');

  const allPublicPosts = posts.where('description.isPrivate', '==', false);
  const allUserPosts = posts.where('username', '==', username);

  const allUserPublicPosts = allUserPosts.where(
    'description.isPrivate',
    '==',
    false
  );

  const userFollowedDocsRef = allPublicPosts.where(
    'userId',
    'in',
    currentUserDoc.following.concat(currentUserDoc.userId) //so user can see their own posts on timeline
  );

  function extractDocs({ docs: docRefs }) {
    setNumOfAvailableDocs(docRefs.length);

    let retrievedDocs = [];
    for (let i = 0; i < docRefs.length; i++) {
      retrievedDocs.push({
        ...docRefs[i].data(),
        isLikedByUser: docRefs[i].data().likes.includes(currentUserDoc.userId),
        id: docRefs[i].id,
      });
    }
    setDocs(retrievedDocs);
  }

  // set up a single onSnapshot listener that fires with qS of entire collection
  useEffect(() => {
    const unsub = posts.onSnapshot(({ docs: docRefs }) => {
      if (docRefs.length === allDocRefs.length) return;
      /*^ensures new docs only set following CD (create || delete)
      oSS will also fire when any document is updated e.g. a single liked added to "likes" []
      setting new docs & re-rendering whole page for this would be overkill*/
      setAllDocRefs(docRefs);
    });
    return unsub;
  }, []);

  // to be run when onSnapshot handler updates allDocRefs
  useEffect(() => {
    if (!allDocRefs.length) return;
    if (!allDocRefs[0].data().createdAt) return;

    //"Home"
    if (!username) {
      userFollowedDocsRef.get().then(extractDocs);
      return;
    }

    //authenticated user's "CameraRoll" or "OtherUser"
    if (username) {
      let collectionToQuery =
        username === currentUserDoc.username
          ? allUserPosts
          : allUserPublicPosts;

      collectionToQuery.get().then(extractDocs);
      return;
    }
  }, [allDocRefs]);

  return [docs, numOfAvailableDocs];
};

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