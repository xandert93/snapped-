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
  // CLEAR_POST_TO_EDIT,
  DELETE_POST,
  CREATE_POST_COMMENT,
  DELETE_POST_COMMENT,
  UPDATE_POST_LIKES,
} from './types';

let initialState = {
  isLoading: false,
  timeline: [],
  user: [],
  altUser: [],
  explore: [],
  postToEdit: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };

    case SET_TIMELINE_POSTS:
      return { ...state, timeline: payload, isLoading: false };
    case SET_USER_POSTS:
      return { ...state, user: payload, isLoading: false };
    case SET_ALT_USER_POSTS:
      return { ...state, altUser: payload, isLoading: false };
    case SET_EXPLORE_POSTS:
      return { ...state, explore: payload, isLoading: false };
    case SET_SINGLE_POST:
      return { ...state, singlePost: payload, isLoading: false };

    case CREATE_POST:
      return {
        ...state,
        timeline: [payload, ...state.timeline], //must be inserted first (newest --> oldest)
        user: [payload, ...state.user],
      };

    case SET_POST_TO_EDIT:
      return {
        ...state,
        postToEdit: state.user.find((post) => post.id === payload),
      };

    case UPDATE_POST:
      const { newDescription, newIsPrivate } = payload;

      const mapCB0 = (post) =>
        post.id === state.postToEdit.id
          ? { ...post, description: newDescription }
          : post;

      return {
        ...state,

        timeline:
          newIsPrivate === true
            ? state.timeline.filter((post) => post.id !== state.postToEdit.id)
            : newIsPrivate === false
            ? state.timeline
                .concat(state.postToEdit)
                .sort(
                  (post1, post2) =>
                    post2.createdAt.seconds - post1.createdAt.seconds
                )
            : state.timeline.map(mapCB0),

        //no need to replicated on "Profile" page - "tabbedPosts" recalculated when this state changes:
        user: state.user.map(mapCB0),
      };

    // case CLEAR_POST_TO_EDIT:
    //   return {
    //     ...state,
    //     postToEdit: initialState.postToEdit,
    //   };

    case DELETE_POST:
      const filterCB = (post) => post.id !== state.postToEdit.id;
      return {
        ...state,
        timeline: state.timeline.filter(filterCB),
        user: state.user.filter(filterCB),
        postToEdit: initialState.postToEdit,
      };

    case UPDATE_POST_LIKES:
      const { id, wasLiked, userUsername } = payload;

      const mapCB1 = (post) =>
        post.id === id
          ? {
              ...post,
              likes: wasLiked
                ? [...post.likes, userUsername]
                : post.likes.filter((username) => username !== userUsername),
              isLikedByUser: wasLiked,
            }
          : post;

      return {
        ...state,
        timeline: state.timeline.map(mapCB1),
        user: state.user.map(mapCB1),
      };

    case CREATE_POST_COMMENT: {
      const { id, comment: newComment } = payload;
      const mapCB2 = (post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, newComment] }
          : post;

      return {
        ...state,
        timeline: state.timeline.map(mapCB2),
        user: state.user.map(mapCB2),
      };
    }

    case DELETE_POST_COMMENT: {
      const { id, comment: commentToDelete } = payload;

      const mapCB3 = (post) =>
        post.id === id
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment !== commentToDelete
              ),
            }
          : post;

      return {
        ...state,
        timeline: state.timeline.map(mapCB3),
        user: state.user.map(mapCB3),
      };
    }

    default:
      return state;
  }
};
