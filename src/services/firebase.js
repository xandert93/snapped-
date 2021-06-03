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

//FBA user created. Use it to create userDoc on FBFS
export const addUserToDb = (user, username, fullName) =>
  users.add({
    userId: user.uid,
    username: username.toLowerCase(),
    fullName: fullName.toLowerCase().replace(/\b./g, (a) => a.toUpperCase()),
    email: user.email,
    following: [],
    followers: [],
    createdAt: FieldValue.serverTimestamp(),
  });

//a) FBA user loaded. Now use its "uid" to get currentUserDoc from FBFS. Populate UI with it
//b) used <Link to "/p/:username"> to another user's page. Take the param to get their doc
export const getUserDocFromDb = async (uid, username) => {
  const args = uid ? ['userId', '==', uid] : ['username', '==', username];

  const {
    docs: [docRef],
  } = await users.where(...args).get();
  return { ...docRef.data(), id: docRef.id };
};

export const getSuggestedUserDocs = async (username, following) => {
  const { docs: docRefs } = await users
    .where('username', '!=', username)
    .limit(10)
    .get();

  return docRefs
    .map((docRef) => ({ ...docRef.data(), id: docRef.id }))
    .filter((otherUserDoc) => !following.includes(otherUserDoc.username));
};

//CRAP:
// export const getUsersFollowDocs = async (userDoc) => {
//   const { docs: docRefs } = await users
//     .where('username', 'in', userDoc.following.concat(userDoc.followers))
//     .get();

//   return docRefs.map((docRef) => ({ ...docRef.data(), id: docRef.id }));
// };

/*POSTS COLLECTION*/
const posts = db.collection('Posts');

export const createPost = async (newPost) => {
  await posts.add(newPost);
  return;
};

export const getNumOfUserPosts = async (username) => {
  const { docs: docRefs } = await posts.where('username', '==', username).get();
  return docRefs.length;
};

export const updateFollow = async (
  currentUserDoc,
  suggestedProfileDoc,
  isAlreadyFollowing = false //will be useful on OtherProfile page to toggle follow/unfollow
) => {
  await users.doc(currentUserDoc.id).update({
    following: !isAlreadyFollowing
      ? FieldValue.arrayUnion(suggestedProfileDoc.username)
      : FieldValue.arrayRemove(suggestedProfileDoc.username),
  });

  await users.doc(suggestedProfileDoc.id).update({
    followers: !isAlreadyFollowing
      ? FieldValue.arrayUnion(currentUserDoc.username)
      : FieldValue.arrayRemove(currentUserDoc.username),
  });
  return;
};

export const updatePostLikes = async (docId, username, wasLiked) => {
  await posts.doc(docId).update({
    likes: wasLiked
      ? FieldValue.arrayUnion(username)
      : FieldValue.arrayRemove(username),
  });
  return;
};

export const updatePostComments = async (docId, commentObj) => {
  await posts.doc(docId).update({
    comments: FieldValue.arrayUnion(commentObj),
  });
};

export const updatePostsUsername = async (username, newUsername) => {
  const { docs: docRefs } = await posts.where('username', '==', username).get();

  const updatePromisesArr = docRefs.map(async (docRef) => {
    await posts.doc(docRef.id).update({ username: newUsername });
  });

  await Promise.all(updatePromisesArr);

  return;
};
