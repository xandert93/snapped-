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

let initialState = {
  timeline: [],
  user: [],
  altUser: [],
  explore: [],
  postToEdit: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TIMELINE_POSTS:
      return { ...state, timeline: payload };
    case SET_USER_POSTS:
      return { ...state, user: payload };
    case SET_ALT_USER_POSTS:
      return { ...state, altUser: payload };
    case SET_EXPLORE_POSTS:
      return { ...state, explore: payload };

    case CREATE_POST:
      return {
        ...state,
        timeline: [payload, ...state.timeline], //must be inserted first (newest --> oldest)
        user: [payload, ...state.user],
      };

    case SET_POST_TO_EDIT:
      return {
        ...state,
        postToEdit: state.timeline.find((post) => post.id === payload),
      };
    case UPDATE_POST:
      const mapCB = (post) =>
        post.id === state.postToEdit.id
          ? { ...post, description: payload }
          : post;
      return {
        ...state,
        timeline: state.timeline.map(mapCB),
        user: state.user.map(mapCB),
      };
    case CLEAR_POST_TO_EDIT:
      return {
        ...state,
        postToEdit: initialState.postToEdit,
      };

    case DELETE_POST:
      const filterCB = (post) => post.id !== state.postToEdit.id;
      return {
        ...state,
        timeline: state.timeline.filter(filterCB),
        user: state.user.filter(filterCB),
        postToEdit: initialState.postToEdit,
      };
    default:
      return state;
  }
};
