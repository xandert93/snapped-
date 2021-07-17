import {
  SET_IS_CHECKING_USER,
  SET_FB_AUTH_USER,
  SET_USER,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_FOLLOWING,
} from './types';

let initialState = {
  isCheckingUser: true,
  firebaseAuthUser: null,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_CHECKING_USER:
      return { ...state, isCheckingUser: payload };
    case SET_FB_AUTH_USER:
      return { ...state, firebaseAuthUser: payload };

    case SET_USER:
      return { ...state, user: payload };
    case UPDATE_USER_PROFILE_PICTURE:
      return { ...state, user: { ...state.user, profilePicURL: payload } };
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

    default:
      return state;
  }
};
