import {
  fbGetPosts,
  fbGetSinglePost,
  fbCreatePostComment,
  fbDeletePost,
  fbDeletePostComment,
  fbUpdatePostLikes,
  fbUpdatePost,
} from '../../services/firebase/firestore/posts';
import {
  allPublicTagPostsRef,
  allUserPostsRef,
  altUserPublicPostsRef,
  timelinePostsRef,
} from '../../services/firebase/firestore/refs';
import { closePostCreateDialog, closePostEditDialog, setIsSubmitting, setSuccessSnackbar } from '../app/actions';
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
  CLEAR_POSTS_STATE,
} from './types';

import { getUserUsername } from './helpers';
import { clearCreateForm } from '../upload/actions';

export const setIsPostsLoading = (bool) => ({
  type: SET_IS_LOADING,
  payload: bool,
});

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

export const createPost = (newPost) => async (dispatch, getState) => {
  dispatch({ type: CREATE_POST, payload: newPost });

  const newPostCount = getState().posts.user.length;

  dispatch(closePostCreateDialog());
  dispatch(clearCreateForm());
  dispatch(setSuccessSnackbar(`Congratulations. You have now made ${newPostCount} posts!`));
};

export const setPostToEdit = (id) => ({ type: SET_POST_TO_EDIT, payload: id });

export const updatePost = (newDescription) => async (dispatch, getState) => {
  dispatch(setIsSubmitting(true));

  let postId = getState().posts.postToEdit.id;
  let isPrivacyUpdated = getState().posts.postToEdit.description.isPrivate !== newDescription.isPrivate;

  await fbUpdatePost(postId, newDescription);

  dispatch({
    type: UPDATE_POST,
    payload: {
      newDescription,
      newIsPrivate: isPrivacyUpdated ? newDescription.isPrivate : null,
    },
  });

  dispatch(setIsSubmitting(false));
  dispatch(closePostEditDialog());
  dispatch(setSuccessSnackbar('Your post has been updated.'));
};

// export const clearPostToEdit = () => ({ type: CLEAR_POST_TO_EDIT });

export const deletePost = () => async (dispatch, getState) => {
  const { id, fileName } = getState().posts.postToEdit;

  await fbDeletePost(id, fileName);
  dispatch({ type: DELETE_POST });
  dispatch(setSuccessSnackbar('Your post was successfully deleted. #RIP'));
};

export const updatePostLikes = (id, wasLiked) => {
  return async (dispatch, getState) => {
    let userUsername = getUserUsername(getState);

    await fbUpdatePostLikes(id, userUsername, wasLiked);
    dispatch({ type: UPDATE_POST_LIKES, payload: { id, userUsername, wasLiked } });
  };
};

export const createPostComment = (id, commentText) => async (dispatch, getState) => {
  let userUsername = getUserUsername(getState);
  let newComment = { username: userUsername, text: commentText };

  await fbCreatePostComment(id, newComment);
  dispatch({ type: CREATE_POST_COMMENT, payload: { id, newComment } });
};

export const deletePostComment = (id, commentToDelete) => async (dispatch) => {
  await fbDeletePostComment(id, commentToDelete);
  dispatch({ type: DELETE_POST_COMMENT, payload: { id, commentToDelete } });
};

export const clearPostsState = () => ({ type: CLEAR_POSTS_STATE });
