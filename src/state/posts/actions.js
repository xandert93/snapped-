import {
  fbGetPosts,
  fbGetSinglePost,
  fbCreatePostComment,
  fbDeletePost,
  fbDeletePostComment,
  fbUpdatePostLikes,
} from '../../services/firebase/firestore/posts';
import {
  allPublicTagPostsRef,
  allUserPostsRef,
  altUserPublicPostsRef,
  timelinePostsRef,
} from '../../services/firebase/firestore/refs';
import { setSuccessSnackbar } from '../app/actions';
import {
  SET_IS_LOADING,
  SET_TIMELINE_POSTS,
  SET_USER_POSTS,
  SET_ALT_USER_POSTS,
  SET_EXPLORE_POSTS,
  SET_SINGLE_POST,
  CREATE_POST,
  SET_POST_TO_EDIT,
  UPDATE_POST,
  CLEAR_POST_TO_EDIT,
  DELETE_POST,
  CREATE_POST_COMMENT,
  DELETE_POST_COMMENT,
  UPDATE_POST_LIKES,
} from './types';

export const setIsLoading = (bool) => ({
  type: SET_IS_LOADING,
  payload: bool,
});

const getUserUsername = (getState) => getState().auth.user.username;

export const setTimelinePosts = () => async (dispatch, getState) => {
  let userUsername = getUserUsername(getState);
  let timelineFollowing = [...getState().auth.user.following, userUsername]; //so user can see their own posts on timeline

  const posts = await fbGetPosts(timelinePostsRef(timelineFollowing), userUsername);
  dispatch({ type: SET_TIMELINE_POSTS, payload: posts });
};

export const setUserPosts = () => async (dispatch, getState) => {
  let userUsername = getUserUsername(getState);

  const posts = await fbGetPosts(allUserPostsRef(userUsername), userUsername);
  dispatch({ type: SET_USER_POSTS, payload: posts });
};

export const setSinglePost = (postId) => async (dispatch, getState) => {
  let userUsername = getUserUsername(getState);

  const post = await fbGetSinglePost(postId, userUsername);
  dispatch({ type: SET_SINGLE_POST, payload: post });
};

export const setAltUserPosts = (altUserUsername) => async (dispatch, getState) => {
  let userUsername = getUserUsername(getState);

  const posts = await fbGetPosts(altUserPublicPostsRef(altUserUsername), userUsername);
  dispatch({ type: SET_ALT_USER_POSTS, payload: posts });
};

export const setExplorePosts = (tag) => async (dispatch, getState) => {
  let userUsername = getUserUsername(getState);

  const posts = await fbGetPosts(allPublicTagPostsRef(tag), userUsername);
  dispatch({ type: SET_EXPLORE_POSTS, payload: posts });
};

export const createPost = (newPost) => ({ type: CREATE_POST, payload: newPost });

export const setPostToEdit = (id) => ({ type: SET_POST_TO_EDIT, payload: id });

export const updatePost = (newDescription) => (dispatch, getState) => {
  let isPrivacyUpdated = getState().posts.postToEdit.description.isPrivate !== newDescription.isPrivate;

  dispatch({
    type: UPDATE_POST,
    payload: {
      newDescription,
      newIsPrivate: isPrivacyUpdated ? newDescription.isPrivate : null,
    },
  });
};

// export const clearPostToEdit = () => ({ type: CLEAR_POST_TO_EDIT });

export const deletePost = () => async (dispatch, getState) => {
  const { id, fileName } = getState().posts.postToEdit;

  await fbDeletePost(id, fileName);
  dispatch({ type: DELETE_POST });
  dispatch(setSuccessSnackbar('Your post was successfully deleted. #RIP'));
};

export const updatePostLikes = (id, userUsername, wasLiked) => {
  return async (dispatch) => {
    await fbUpdatePostLikes(id, userUsername, wasLiked);
    dispatch({ type: UPDATE_POST_LIKES, payload: { id, userUsername, wasLiked } });
  };
};

export const createPostComment = (id, comment) => async (dispatch) => {
  await fbCreatePostComment(id, comment);
  dispatch({ type: CREATE_POST_COMMENT, payload: { id, comment } });
};

export const deletePostComment = (id, comment) => async (dispatch) => {
  await fbDeletePostComment(id, comment);
  dispatch({ type: DELETE_POST_COMMENT, payload: { id, comment } });
};
