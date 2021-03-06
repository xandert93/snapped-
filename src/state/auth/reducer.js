import {
  SET_IS_CHECKING_USER,
  SET_FB_AUTH_USER,
  SET_USER,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_DETAILS,
  UPDATE_USER_FOLLOWING,
  UPDATE_PREV_USER_FOLLOWING,
} from './types';

let initialState = {
  isCheckingUser: true,
  fbAuthUser: null,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_CHECKING_USER:
      return { ...state, isCheckingUser: payload };
    case SET_FB_AUTH_USER:
      return { ...state, fbAuthUser: payload };
    case SET_USER:
      return { ...state, user: payload };

    case UPDATE_USER_PROFILE_PICTURE:
      return { ...state, user: { ...state.user, profilePicURL: payload } };
    case UPDATE_USER_DETAILS:
      return { ...state, user: { ...state.user, details: payload } };

    case UPDATE_USER_FOLLOWING:
      const { altUserUsername, isAltUserFollowed } = payload;
      const { following } = state.user;
      return {
        ...state,
        user: {
          ...state.user,
          following: isAltUserFollowed
            ? following.filter((username) => username !== altUserUsername)
            : following.concat(altUserUsername),
        },
      };

    case UPDATE_PREV_USER_FOLLOWING:
      return {
        ...state,
        user: {
          ...state.user,
          prevFollowing: state.user.following,
        },
      };

    default:
      return state;
  }
};
