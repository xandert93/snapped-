import { db, FieldValue } from '../lib/firebase/config';

export const checkUsernameTaken = async (username) => {
  const { docs: leanDocRefs } = await db
    .collection('users')
    .where('username', '==', username)
    .get();

  return !!leanDocRefs.length; //if 1 (true), username already exists and vv.
  //since this is an async function, the value will be returned in a Promise
  //must thus be called via "await checkUsernameTake(username)"
};

export const addUserToDb = (credToken, username, fullName) =>
  db.collection('Users').add({
    userId: credToken.user.uid,
    username: username.toLowerCase(),
    fullName: fullName.toLowerCase().replace(/\b./g, (a) => a.toUpperCase()),
    email: credToken.user.email,
    following: [],
    followers: [],
    createdAt: FieldValue.serverTimestamp(),
  });
