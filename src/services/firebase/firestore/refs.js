import { db } from '../../../lib/firebase/config';

export const postsCollectionRef = db
  .collection('Posts')
  .orderBy('createdAt', 'desc');

export const allUserPostsRef = (userUsername) =>
  postsCollectionRef.where('username', '==', userUsername);

export const timelinePostsRef = (timelineFollowing) =>
  postsCollectionRef
    .where('username', 'in', timelineFollowing)
    .where('description.isPrivate', '==', false); //only public posts from users shown on timeline

export const altUserPublicPostsRef = (altUserUsername) =>
  postsCollectionRef
    .where('username', '==', altUserUsername)
    .where('description.isPrivate', '==', false);

export const allPublicTagPostsRef = (tag) =>
  postsCollectionRef
    .where('description.isPrivate', '==', false)
    .where('description.tags', 'array-contains', tag);
