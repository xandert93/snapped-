import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrevUserFollowing } from '../state/auth/actions';
import { createProfilePicsLookup } from '../state/lookups/actions';
import {
  setIsPostsLoading,
  setAltUserPosts,
  setExplorePosts,
  setSinglePost,
  setTimelinePosts,
  setUserPosts,
} from '../state/posts/actions';

import { useParams, useRouteMatch } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { selectTimelinePosts, selectUserPosts } from '../state/posts/selectors';

export const usePostsCollection = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { username, tag, postId } = useParams();

  const lookup = useSelector((state) => state.lookups.profilePics);
  const timelinePostsExist = !!useSelector(selectTimelinePosts).length;
  const userPostsExist = !!useSelector(selectUserPosts).length;
  const isUserFollowingChanged = useSelector((state) => state.auth.user.following !== state.auth.user.prevFollowing);

  useEffect(() => {
    (async () => {
      dispatch(setIsPostsLoading(true));

      if (!lookup) dispatch(createProfilePicsLookup());

      //NB - user's username passed into database call to populate an ad-hoc field of "isLikedByUser" on each post doc
      switch (path) {
        case ROUTES.HOME:
          if (!timelinePostsExist || isUserFollowingChanged) {
            //if first visit to "Home" page || user has un/followed another user
            dispatch(updatePrevUserFollowing());
            dispatch(setTimelinePosts());
          }
          if (!userPostsExist) dispatch(setUserPosts());
          if (timelinePostsExist && !isUserFollowingChanged && userPostsExist) dispatch(setIsPostsLoading(false));
          return;

        case ROUTES.SINGLE_POST:
          return dispatch(setSinglePost(postId));

        case ROUTES.USER_PROFILE:
          //if first visit to "Profile" page...
          if (!userPostsExist) return dispatch(setUserPosts());
          return dispatch(setIsPostsLoading(false));

        case ROUTES.ALT_PROFILE:
          return dispatch(setAltUserPosts(username.toLowerCase()));

        case ROUTES.EXPLORE:
          return dispatch(setExplorePosts(tag));

        // case ROUTES.SEARCH: {
        // }
      }
    })();
  }, []);
};

/* When user logs in, they are redirected to "Home" page. Here, I MUST have both their "timelinePosts" + "userPosts" arrays. 
This is because, both the "Home" and "Profile" pages offer CRUD (update || delete) on the users own posts. 

Any attempt to perform Redux Store CRUD (following easy Firebase CRUD) on either page will need to rely on a single source of truth for the posts state i.e.:

case SET_POST_TO_EDIT: state.____.find(id)

In our app, given that all user posts are guaranteed to be .find()-able in their "userPosts" array, we should set it to that i.e.:

case SET_POST_TO_EDIT: state.user.find(id), where "state.user" is the "userPosts" array. 

Despite temptation, we should not do:

case SET_POST_TO_EDIT: state.timeline.find(id), because, if the user is on their "Profile" page, and attempts to delete their oldest e.g. 200th post,
there is no guarantee that the timeline state will contain it. 
*/
