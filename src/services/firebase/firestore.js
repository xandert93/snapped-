import { bucket, db, FieldValue } from '../../lib/firebase/config';
import { createCompressedFile } from '../../utils/helpers';

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
export const addUserToDb = (userRecord, username, fullName) =>
  users.add({
    userId: userRecord.uid,
    username: username.toLowerCase(),
    fullName: fullName.toLowerCase().replace(/\b./g, (a) => a.toUpperCase()),
    email: userRecord.email,
    following: [],
    followers: [],
    createdAt: FieldValue.serverTimestamp(),
  });

//a) FBA user loaded. Now use its "uid" to get user from FBFS. Populate UI with it
//b) used <Link to "/p/:username"> to another user's page. Take the param to get their doc
export const getUserDocFromDb = async (uid, username) => {
  const args = uid ? ['userId', '==', uid] : ['username', '==', username];

  const {
    docs: [docRef],
  } = await users.where(...args).get();
  return { ...docRef.data(), id: docRef.id };
};

export async function uploadProfilePicture(user, file) {
  const imageRef = bucket.ref(`pfp-${user.username}`);
  const compressedFile = await createCompressedFile(file);
  await imageRef.put(compressedFile);
  const url = await imageRef.getDownloadURL();
  await updateUserProfilePicture(user.id, url);
  return url;
}

export async function updateUserProfilePicture(docId, url) {
  await users.doc(docId).update({
    profilePicURL: url,
  });
}

export const getSuggestedUserDocs = async (username, following) => {
  const { docs: docRefs } = await users
    .where('username', '!=', username)
    .limit(10)
    .get();

  return docRefs
    .map((docRef) => ({ ...docRef.data(), id: docRef.id }))
    .filter((altUser) => !following.includes(altUser.username));
};

export const createFollowUsersLookup = async (followers, following) => {
  const followUsernames = [...new Set([...followers, ...following])];

  const { docs: docRefs } = await users
    .where('username', 'in', followUsernames)
    .get();

  //create object lookup e.g.: {zeldie: {username: 'zeldie', id: ""}, chaz: {}}
  return docRefs.reduce((acca, docRef) => {
    const username = docRef.data().username;
    acca[username] = { username, id: docRef.id };
    return acca;
  }, {});
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
  const docRef = await posts.add(newPost);
  //this ^ doesn't have createdAt value, so let's  get actual inserted doc from firestore:
  const docRefWithTimeStamp = await posts.doc(docRef.id).get();

  return { ...docRefWithTimeStamp.data(), id: docRef.id };
};

export const updatePostDescription = async (docId, description) => {
  await posts.doc(docId).update({ description });
};

export const deletePost = async (docId, fileName) => {
  await posts.doc(docId).delete();
  await bucket.ref(fileName).delete();
};

export const getNumOfUserPosts = async (username) => {
  const { docs: docRefs } = await posts.where('username', '==', username).get();
  return docRefs.length;
};

export const updateFollow = async (
  user,
  altUser,
  isAlreadyFollowing = false //will be useful on AltUser page to toggle follow/unfollow
) => {
  await users.doc(user.id).update({
    following: !isAlreadyFollowing
      ? FieldValue.arrayUnion(altUser.username)
      : FieldValue.arrayRemove(altUser.username),
  });

  await users.doc(altUser.id).update({
    followers: !isAlreadyFollowing
      ? FieldValue.arrayUnion(user.username)
      : FieldValue.arrayRemove(user.username),
  });
};

export const updatePostLikes = async (docId, username, wasLiked) => {
  await posts.doc(docId).update({
    likes: wasLiked
      ? FieldValue.arrayUnion(username)
      : FieldValue.arrayRemove(username),
  });
};

export const createPostComment = async (docId, comment) => {
  await posts.doc(docId).update({
    comments: FieldValue.arrayUnion(comment),
  });
};

export const deletePostComment = async (docId, comment) => {
  await posts.doc(docId).update({
    comments: FieldValue.arrayRemove(comment),
  });
};

export const updatePostsUsername = async (username, newUsername) => {
  const { docs: docRefs } = await posts.where('username', '==', username).get();

  const updatePromisesArr = docRefs.map(async (docRef) => {
    await posts.doc(docRef.id).update({ username: newUsername });
  });

  await Promise.all(updatePromisesArr);
};
