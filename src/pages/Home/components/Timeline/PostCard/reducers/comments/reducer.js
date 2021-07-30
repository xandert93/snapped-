import {
  SET_COMMENT_TEXT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_PAGE_NUM,
} from './types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_COMMENT_TEXT:
      return {
        ...state,
        commentText: payload,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload],
        commentText: '',
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment !== payload),
      };
    case UPDATE_PAGE_NUM:
      const { pageNum, maxCommentsShown } = payload;
      return { ...state, pageNum, sliceIdx: maxCommentsShown * pageNum };
    default:
      return state;
  }
};
