import { SET_PROFILE_PICS_LOOKUP, SET_FOLLOW_USERS_LOOKUP } from './types';

let initialState = {
  profilePics: null,
  followUsers: null, //altUsers that the user is specifically following or followed by. Used on a given user or altUser's "Profile" page
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROFILE_PICS_LOOKUP:
      return { ...state, profilePics: payload };

    case SET_FOLLOW_USERS_LOOKUP:
      return { ...state, followUsers: payload };
    default:
      return state;
  }
};
