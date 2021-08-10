import { bucket, db, FieldValue } from '../../../lib/firebase/config';

const posts = db.collection('Posts');

/*post CRUD*/
export async function fbGetPosts(ref, username) {
  const { docs: docRefs } = await ref.get();

  let extractedPosts = docRefs.reduce((acca, docRef) => {
    let post = docRef.data();
    acca[docRef.id] = { ...post, isLikedByUser: post.likes.includes(username), id: docRef.id };
    return acca;
  }, {});

  //document insertion order maintained in object, since keys are non-integer Strings
  return extractedPosts;
}

export const fbCreatePost = async (newPost) => {
  const docRef = await posts.add(newPost);
  //this ^ doesn't have createdAt value, so let's  get actual inserted doc from firestore:
  const docRefWithTimeStamp = await posts.doc(docRef.id).get();

  return { ...docRefWithTimeStamp.data(), id: docRef.id };
};

export const fbUpdatePost = async (docId, description) => {
  await posts.doc(docId).update({ description });
};

export const fbDeletePost = async (docId, fileName) => {
  await posts.doc(docId).delete();
  await bucket.ref(fileName).delete();
};

/*post likes CRUD*/
export const fbUpdatePostLikes = async (docId, username, wasLiked) => {
  await posts.doc(docId).update({
    likes: wasLiked ? FieldValue.arrayUnion(username) : FieldValue.arrayRemove(username),
  });
};

export const fbGetSinglePost = async (docId, username) => {
  const docRef = await posts.doc(docId).get();
  return {
    ...docRef.data(),
    isLikedByUser: docRef.data().likes.includes(username),
    id: docRef.id,
  };
};

/*post comments CRUD*/
export const fbCreatePostComment = async (docId, comment) => {
  await posts.doc(docId).update({
    comments: FieldValue.arrayUnion(comment),
  });
};

export const fbDeletePostComment = async (docId, comment) => {
  await posts.doc(docId).update({
    comments: FieldValue.arrayRemove(comment),
  });
};
