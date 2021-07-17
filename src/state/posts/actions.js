import { fbDeletePost } from '../../services/firebase/firestore';
import { setSuccessSnackbar } from '../app/actions';
import {
  SET_TIMELINE_POSTS,
  SET_USER_POSTS,
  SET_ALT_USER_POSTS,
  SET_EXPLORE_POSTS,
  CREATE_POST,
  SET_POST_TO_EDIT,
  UPDATE_POST,
  CLEAR_POST_TO_EDIT,
  DELETE_POST,
} from './types';

export const setTimelinePosts = (posts) => ({
  type: SET_TIMELINE_POSTS,
  payload: posts,
});

export const setUserPosts = (posts) => ({
  type: SET_USER_POSTS,
  payload: posts,
});

export const setAltUserPosts = (posts) => ({
  type: SET_ALT_USER_POSTS,
  payload: posts,
});

export const setExplorePosts = (posts) => ({
  type: SET_EXPLORE_POSTS,
  payload: posts,
});

export const createPost = (newPost) => ({
  type: CREATE_POST,
  payload: newPost,
});

export const setPostToEdit = (id) => ({
  type: SET_POST_TO_EDIT,
  payload: id,
});

export const updatePost = (newDescription) => ({
  type: UPDATE_POST,
  payload: newDescription,
});

// export const clearPostToEdit = () => ({ type: CLEAR_POST_TO_EDIT });

export const deletePost = () => async (dispatch, getState) => {
  const { id, fileName } = getState().posts.postToEdit;

  await fbDeletePost(id, fileName);
  dispatch({ type: DELETE_POST });
  dispatch(setSuccessSnackbar('Your post was successfully deleted. #RIP'));
};
