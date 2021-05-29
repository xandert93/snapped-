import { db, FieldValue } from '../lib/firebase/config';

const usersCollectionRef = db.collection('Users');

//Before sign up initiated, check if username taken on FBFS
//(Needn't be done for email - FSA natively checks this)
export const checkUsernameTaken = async (username) => {
  const { docs: leanDocRefs } = await usersCollectionRef
    .where('username', '==', username)
    .get();

  return !!leanDocRefs.length; //if 1 (true), username already exists and vv.
  //since this is an async function, the value will be returned in a Promise
  //must thus be called via "await checkUsernameTake(username)"
};

//FBA user created. Use returned credential token to create user doc on FBFS
export const addUserToDb = (credToken, username, fullName) =>
  usersCollectionRef.add({
    userId: credToken.user.uid,
    username: username.toLowerCase(),
    fullName: fullName.toLowerCase().replace(/\b./g, (a) => a.toUpperCase()),
    email: credToken.user.email,
    following: [],
    followers: [],
    createdAt: FieldValue.serverTimestamp(),
  });

//FBA user loaded. Now use its "uid" to get user doc from FBFS. Populate UI with it
export const getUserDocFromDb = async (uid) => {
  const {
    docs: [docRef],
  } = await usersCollectionRef.where('userId', '==', uid).get();
  return { ...docRef.data(), id: docRef.id };
};

export const getSuggestedProfiles = async (userId, following) => {
  const { docs: docRefs } = await usersCollectionRef
    .where('userId', '!=', userId)
    .limit(10)
    .get();

  return docRefs
    .map((docRef) => ({ ...docRef.data(), id: docRef.id }))
    .filter((otherUserDoc) => !following.includes(otherUserDoc.userId));
};

export const updateFollow = async (
  currentUserDoc,
  suggestedProfileDoc,
  isAlreadyFollowing = false //will be useful on OtherProfile page to toggle follow/unfollow
) => {
  await usersCollectionRef.doc(currentUserDoc.id).update({
    following: !isAlreadyFollowing
      ? FieldValue.arrayUnion(suggestedProfileDoc.userId)
      : FieldValue.arrayRemove(suggestedProfileDoc.userId),
  });

  await usersCollectionRef.doc(suggestedProfileDoc.id).update({
    followers: !isAlreadyFollowing
      ? FieldValue.arrayUnion(currentUserDoc.userId)
      : FieldValue.arrayRemove(currentUserDoc.userId),
  });
};
