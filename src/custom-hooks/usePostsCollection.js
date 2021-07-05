import { useContext, useEffect, useState } from 'react';
import { authContext } from '../contexts/1.auth/authContext';
import { db } from '../lib/firebase/config';

export const usePostsCollection = (username = '', tag = '') => {
  const { currentUser } = useContext(authContext);

  const [allDocRefs, setAllDocRefs] = useState([]);
  const [docs, setDocs] = useState([]);

  const posts = db.collection('Posts').orderBy('createdAt', 'desc');

  const allPublicPosts = posts.where('description.isPrivate', '==', false);

  const allPublicTagPosts = allPublicPosts.where(
    'description.tags',
    'array-contains',
    tag
  );

  const allUserPosts = posts.where('username', '==', username);

  const onlyUserPublicPosts = allUserPosts.where(
    'description.isPrivate',
    '==',
    false
  );

  const userFollowedDocsRef = allPublicPosts.where(
    'username',
    'in',
    currentUser.following.concat(currentUser.username) //so user can see their own posts on timeline
  );

  function extractDocs({ docs: docRefs }) {
    let retrievedDocs = [];
    for (let i = 0; i < docRefs.length; i++) {
      retrievedDocs.push({
        ...docRefs[i].data(),
        isLikedByUser: docRefs[i].data().likes.includes(currentUser.username),
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
    if (!username && !tag) {
      userFollowedDocsRef.get().then(extractDocs);
      return;
    }

    //authenticated user's "MyProfile" or "AltProfile"
    if (username) {
      let collectionToQuery =
        username === currentUser.username ? allUserPosts : onlyUserPublicPosts;

      collectionToQuery.get().then(extractDocs);
      return;
    }

    //"Explore" with params tag
    if (tag) {
      allPublicTagPosts.get().then(extractDocs);
      return;
    }
  }, [allDocRefs]);

  return docs;
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
