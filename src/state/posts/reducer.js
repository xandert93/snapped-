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
  CLEAR_POSTS_STATE,
} from './types';

let initialState = {
  isPostsLoading: false,
  timeline: [],
  user: [],
  altUser: [],
  explore: [],
  postToEdit: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isPostsLoading: payload };

    case SET_TIMELINE_POSTS:
      return { ...state, timeline: payload, isPostsLoading: false };
    case SET_USER_POSTS:
      return { ...state, user: payload, isPostsLoading: false };
    case SET_ALT_USER_POSTS:
      return { ...state, altUser: payload, isPostsLoading: false };
    case SET_EXPLORE_POSTS:
      return { ...state, explore: payload, isPostsLoading: false };
    case SET_SINGLE_POST:
      return { ...state, singlePost: payload, isPostsLoading: false };

    case CREATE_POST:
      let newPost = payload;
      let { isPrivate } = newPost.description;

      return {
        ...state,
        timeline: !isPrivate ? { [newPost.id]: newPost, ...state.timeline } : state.timeline, //must be inserted first (newest --> oldest)
        user: { [newPost.id]: newPost, ...state.user },
      };

    case SET_POST_TO_EDIT: {
      let id = payload;
      return {
        ...state,
        postToEdit: state.user[id],
      };
    }

    case UPDATE_POST: {
      const { newDescription, newIsPrivate } = payload;
      let post = state.postToEdit;
      const id = state.postToEdit.id;

      let updatedTimelinePosts;

      if (newIsPrivate === true) {
        let { [id]: _, ...rest } = state.timeline;
        updatedTimelinePosts = rest;
      } else if (newIsPrivate === false) {
        let unsortedTimelinePosts = { [id]: post, ...state.timeline };
        updatedTimelinePosts = Object.values(unsortedTimelinePosts)
          .sort((post1, post2) => post2.createdAt.seconds - post1.createdAt.seconds)
          .reduce((acca, post) => {
            acca[post.id] = post;
            return acca;
          }, {});
      } else updatedTimelinePosts = { ...state.timeline, [id]: { ...post, description: newDescription } };

      return {
        ...state,
        timeline: updatedTimelinePosts,
        //no need to replicate on "Profile" page - "tabbedPosts" recalculated when this state changes:
        user: { ...state.user, [id]: { ...post, description: newDescription } },
      };
    }
    // case CLEAR_POST_TO_EDIT:
    //   return {
    //     ...state,
    //     postToEdit: initialState.postToEdit,
    //   };

    case DELETE_POST: {
      const id = state.postToEdit.id;

      const deletePost = (stateSlice) => {
        const { [id]: _, ...rest } = stateSlice;
        return rest;
      };

      return {
        ...state,
        timeline: deletePost(state.timeline),
        user: deletePost(state.user),
        postToEdit: initialState.postToEdit,
      };
    }

    case UPDATE_POST_LIKES: {
      const { id, wasLiked, userUsername } = payload;

      const updatePostLikes = (stateSlice) => {
        let post = stateSlice[id];
        if (!post) return stateSlice; //if user hasn't liked their own post, post won't be found in "state.user"

        return {
          ...stateSlice,
          [id]: {
            ...stateSlice[id],
            likes: wasLiked
              ? [...post.likes, userUsername]
              : post.likes.filter((username) => username !== userUsername),
            isLikedByUser: wasLiked,
          },
        };
      };

      return {
        ...state,
        timeline: updatePostLikes(state.timeline),
        user: updatePostLikes(state.user),
      };
    }
    case CREATE_POST_COMMENT: {
      const { id, newComment } = payload;

      const createPostComment = (stateSlice) => {
        let post = stateSlice[id];
        if (!post) return stateSlice; //if user hasn't commented on their own post, post won't be found in "state.user"

        return {
          ...stateSlice,
          [id]: { ...post, comments: [...post.comments, newComment] },
        };
      };

      return {
        ...state,
        timeline: createPostComment(state.timeline),
        user: createPostComment(state.user),
      };
    }

    case DELETE_POST_COMMENT: {
      const { id, commentToDelete } = payload;

      const deletePostComment = (stateSlice) => {
        let post = stateSlice[id];
        if (!post) return stateSlice; //if user hasn't deleted comment on their own post, post won't be found in "state.user"

        return {
          ...stateSlice,
          [id]: { ...post, comments: post.comments.filter((comment) => comment !== commentToDelete) },
        };
      };

      return {
        ...state,
        timeline: deletePostComment(state.timeline),
        user: deletePostComment(state.user),
      };
    }

    case CLEAR_POSTS_STATE:
      return initialState;

    default:
      return state;
  }
};
