import {
  SET_COMMENT_TEXT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_PAGE_NUM,
} from './types';

export const setCommentText = (string) => ({
  type: SET_COMMENT_TEXT,
  payload: string,
});

export const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});

export const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  payload: comment,
});

export const updatePageNum = (pageNum, maxCommentsShown) => ({
  type: UPDATE_PAGE_NUM,
  payload: { pageNum, maxCommentsShown },
});
