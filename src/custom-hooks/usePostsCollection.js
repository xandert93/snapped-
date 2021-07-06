import { useContext, useEffect, useState } from 'react';
import { authContext } from '../contexts/1.auth/authContext';
import { db } from '../lib/firebase/config';

export const usePostsCollection = (username = '', tag = '') => {
  const { user } = useContext(authContext);

  const [docs, setDocs] = useState([]);

  const posts = db.collection('Posts').orderBy('createdAt', 'desc');

  let allPublicPosts,
    allPublicTagPosts,
    allUserPosts,
    onlyUserPublicPosts,
    userFollowedDocsRef;

  //if there is a user, prepare the references to query the database
  if (user) {
    allPublicPosts = posts.where('description.isPrivate', '==', false);

    allPublicTagPosts = allPublicPosts.where(
      'description.tags',
      'array-contains',
      tag
    );

    allUserPosts = posts.where('username', '==', username);

    onlyUserPublicPosts = allUserPosts.where(
      'description.isPrivate',
      '==',
      false
    );

    userFollowedDocsRef = posts.where(
      'username',
      'in',
      user.following.concat(user.username) //so user can see their own posts on timeline
    );
  }

  function extractPosts({ docs: docRefs }) {
    let retrievedDocs = [];
    for (let i = 0; i < docRefs.length; i++) {
      retrievedDocs.push({
        ...docRefs[i].data(),
        isLikedByUser: docRefs[i].data().likes.includes(user.username),
        id: docRefs[i].id,
      });
    }
    setDocs(retrievedDocs);
  }

  useEffect(() => {
    if (!user) return;
    //"Home"
    if (!username && !tag) {
      userFollowedDocsRef.get().then(extractPosts);
      return;
    }

    //authenticated user's "MyProfile" or "AltProfile"
    if (username) {
      let collectionToQuery =
        username === user.username ? allUserPosts : onlyUserPublicPosts;

      collectionToQuery.get().then(extractPosts);
      return;
    }

    //"Explore" with params tag
    if (tag) {
      allPublicTagPosts.get().then(extractPosts);
      return;
    }
  }, [user]);

  return [docs, setDocs];
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

//extractPosts called with snapshot passed into it. Therefore docRefs destructured from it
