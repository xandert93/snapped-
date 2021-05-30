import { db, FieldValue } from '../lib/firebase/config';

/*USERS COLLECTION*/
const users = db.collection('Users');
//Before sign up initiated, check if username taken on FBFS
//(Needn't be done for email - FSA natively checks this)
export const checkUsernameTaken = async (username) => {
  const { docs: leanDocRefs } = await users
    .where('username', '==', username)
    .get();

  return !!leanDocRefs.length; //if 1 (true), username already exists and vv.
  //since this is an async function, the value will be returned in a Promise
  //must thus be called via "await checkUsernameTake(username)"
};

//FBA user created. Use returned credential token to create user doc on FBFS
export const addUserToDb = (credToken, username, fullName) =>
  users.add({
    userId: credToken.user.uid,
    username: username.toLowerCase(),
    fullName: fullName.toLowerCase().replace(/\b./g, (a) => a.toUpperCase()),
    email: credToken.user.email,
    following: [],
    followers: [],
    createdAt: FieldValue.serverTimestamp(),
  });

//a) FBA user loaded. Now use its "displayName" to get currentUserDoc from FBFS. Populate UI with it
//b) used <Link to "/p/:username"> to another user's page. Take the param to get their doc
export const getUserDocFromDb = async (username) => {
  const {
    docs: [docRef],
  } = await users.where('username', '==', username).get();
  return { ...docRef.data(), id: docRef.id };
};

export const getSuggestedProfiles = async (userId, following) => {
  const { docs: docRefs } = await users
    .where('userId', '!=', userId)
    .limit(10)
    .get();

  return docRefs
    .map((docRef) => ({ ...docRef.data(), id: docRef.id }))
    .filter((otherUserDoc) => !following.includes(otherUserDoc.userId));
};

/*POSTS COLLECTION*/
const posts = db.collection('Image URL Data');

export const createPost = async (newPost) => {
  await posts.add(newPost);
  return;
};

export const updateFollow = async (
  currentUserDoc,
  suggestedProfileDoc,
  isAlreadyFollowing = false //will be useful on OtherProfile page to toggle follow/unfollow
) => {
  await users.doc(currentUserDoc.id).update({
    following: !isAlreadyFollowing
      ? FieldValue.arrayUnion(suggestedProfileDoc.userId)
      : FieldValue.arrayRemove(suggestedProfileDoc.userId),
  });

  await users.doc(suggestedProfileDoc.id).update({
    followers: !isAlreadyFollowing
      ? FieldValue.arrayUnion(currentUserDoc.userId)
      : FieldValue.arrayRemove(currentUserDoc.userId),
  });
  return;
};

export const updatePostLikes = async (docId, userId, wasLiked) => {
  await posts.doc(docId).update({
    likes: wasLiked
      ? FieldValue.arrayUnion(userId)
      : FieldValue.arrayRemove(userId),
  });
  return;
};

export const updatePostComments = async (docId, commentObj) => {
  await posts.doc(docId).update({
    comments: FieldValue.arrayUnion(commentObj),
  });
};
