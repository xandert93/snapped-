import { db, FieldValue } from '../../../lib/firebase/config';

const users = db.collection('Users');

//Before sign up initiated, check if username taken on FBFS (Needn't be done for email - FSA natively checks this)
export const checkUsernameTaken = async (username) => {
  const { docs: leanDocRefs } = await users.where('username', '==', username).get();

  return !!leanDocRefs.length; //if 1 (true), username already exists and vv.
};

//FBA user created. Use it to create userDoc on FBFS
export const fbCreateUser = (fbAuthUser, username, name) =>
  users.add({
    userId: fbAuthUser.uid,
    username: username.toLowerCase(),
    name: name.toLowerCase().replace(/\b./g, (a) => a.toUpperCase()),
    details: {
      dob: '',
      pronouns: '',
      bio: '',
      location: '',
      websiteURL: '',
    },
    email: fbAuthUser.email,
    following: [],
    followers: [],
    createdAt: FieldValue.serverTimestamp(),
  });

//a) FBA user loaded. Now use its "uid" to get "user" from FBFS. Populate UI with it
//b) used <Link to "/p/:username"> to "altUser"'s profile. Take the param to get their doc
export const fbGetUser = async (uid, username) => {
  const args = uid ? ['userId', '==', uid] : ['username', '==', username];

  const {
    docs: [docRef],
  } = await users.where(...args).get();
  return { ...docRef.data(), id: docRef.id }; //add in docId for FB CRUD
};

export const fbGetAltUsersBySearch = async (searchTerm, userUsername) => {
  const { docs: docRefs } = await users
    .where('username', '!=', userUsername)
    .where('username', '>=', searchTerm)
    .where('username', '<=', searchTerm + '\uf8ff')
    .get();

  return docRefs.map((docRef) => ({
    username: docRef.data().username,
    id: docRef.id,
  }));
};

export const fbGetSuggestedAltUsers = async (username, following) => {
  const { docs: docRefs } = await users.where('username', '!=', username).limit(10).get();

  return docRefs
    .map((docRef) => ({ ...docRef.data(), id: docRef.id }))
    .filter((altUser) => !following.includes(altUser.username));
};

export async function fbUpdateUserProfilePicture(docId, url) {
  await users.doc(docId).update({ profilePicURL: url });
}

export async function fbUpdateUserDetails(docId, updateObj) {
  await users.doc(docId).update({ details: updateObj });
}

export const fbUpdateUserFollowing = async (userDocId, altUserUsername, isAltUserFollowed) =>
  await users.doc(userDocId).update({
    following: isAltUserFollowed ? FieldValue.arrayRemove(altUserUsername) : FieldValue.arrayUnion(altUserUsername),
  });

export const fbUpdateAltUserFollowers = async (altUserDocId, userUsername, isAltUserFollowed) =>
  await users.doc(altUserDocId).update({
    followers: isAltUserFollowed ? FieldValue.arrayRemove(userUsername) : FieldValue.arrayUnion(userUsername),
  });

/*lookups*/
//for 'Home' page all 'Timeline' posts
export const fbCreateProfilePicsLookup = async () => {
  const { docs: docRefs } = await users.get(); //get entire App users

  return docRefs.reduce((acca, docRef) => {
    const username = docRef.data().username;
    acca[username] = {
      profilePicURL: docRef.data().profilePicURL,
      id: docRef.id,
    };
    return acca;
  }, {});
};

//for 'Profile' page 'Header'
export const fbCreateFollowUsersLookup = async (followers, following) => {
  const followUsernames = [...new Set([...followers, ...following])];

  const { docs: docRefs } = await users.where('username', 'in', followUsernames).get();

  //create object lookup e.g.: {zeldie: {username: 'zeldie', id: ""}, chaz: {}}
  return docRefs.reduce((acca, docRef) => {
    const username = docRef.data().username;
    acca[username] = {
      username,
      id: docRef.id,
    }; //only need altUsers username & id to perform FB CRUD on their user.followers
    return acca;
  }, {});
};
