import { db, FieldValue } from '../lib/firebase/config';

const usersCollectionRef = db.collection('Users');

export const checkUsernameTaken = async (username) => {
  const { docs: leanDocRefs } = await usersCollectionRef
    .where('username', '==', username)
    .get();

  return !!leanDocRefs.length; //if 1 (true), username already exists and vv.
  //since this is an async function, the value will be returned in a Promise
  //must thus be called via "await checkUsernameTake(username)"
};

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

export const getUserDocFromDb = async (uid) => {
  const {
    docs: [docRef],
  } = await usersCollectionRef.where('userId', '==', uid).get();
  return { ...docRef.data(), id: docRef.id };
};
