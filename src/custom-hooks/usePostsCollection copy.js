import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../lib/firebase/config';
import { extractPosts } from '../services/firebase/firestore';
import {
  setAltUserPosts,
  setExplorePosts,
  setTimelinePosts,
  setUserPosts,
} from '../state/posts/actions';
import { userSelector } from '../state/selectors';

const posts = db.collection('Posts').orderBy('createdAt', 'desc');

export const usePostsCollection = (username = '', tag = '') => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const currentUserPosts = useSelector((state) => state.posts.user);

  let allPublicPosts,
    allPublicTagPosts,
    allUserPosts,
    altUserPublicPosts,
    userFollowingPosts;

  //if there is a user, prepare the references to query the database
  if (user) {
    allPublicPosts = posts.where('description.isPrivate', '==', false);

    allPublicTagPosts = allPublicPosts.where(
      'description.tags',
      'array-contains',
      tag
    );

    allUserPosts = posts.where('username', '==', username);

    altUserPublicPosts = allUserPosts.where(
      'description.isPrivate',
      '==',
      false
    );

    userFollowingPosts = posts
      .where(
        'username',
        'in',
        user.following.concat(user.username) //so user can see their own posts on timeline
      )
      .where('description.isPrivate', '==', false);
  }

  useEffect(() => {
    if (!user) return;

    //"Home"
    if (!username && !tag) {
      (async () => {
        const { docs: docRefs } = await userFollowingPosts.get();
        var posts = extractPosts(docRefs, user.username);
        dispatch(setTimelinePosts(posts));

        if (!currentUserPosts.length) {
          const { docs: docRefs } = await allUserPosts.get();
          var posts = extractPosts(docRefs, user.username);
          dispatch(setUserPosts(posts));
        }
      })();
      return;
    }

    //authenticated user's "MyProfile" or "AltProfile"
    if (username) {
      if (username === user.username && !currentUserPosts.length) {
        (async () => {
          const { docs: docRefs } = await allUserPosts.get();
          const posts = extractPosts(docRefs, user.username);
          dispatch(setUserPosts(posts));
        })();
        return;
      } else {
        (async () => {
          const { docs: docRefs } = await altUserPublicPosts.get();
          const posts = extractPosts(docRefs, user.username);
          dispatch(setAltUserPosts(posts));
        })();
        return;
      }
    }

    //"Explore" with params tag
    if (tag) {
      (async () => {
        const { docs: docRefs } = await allPublicTagPosts.get();
        const posts = extractPosts(docRefs, user.username);
        dispatch(setExplorePosts(posts));
      })();
      return;
    }
  }, [user]);
};

/* When user logs in, they are redirected to Home. Here, I need to have both their timeline + own posts data. 
This is because the timeline offers CRUD (edit || delete) on the users own posts and to perform the CRUD on state after Firebase CRUD,
I need the users posts in state 
*/
