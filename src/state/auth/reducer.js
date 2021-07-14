import {
  SET_IS_CHECKING_USER,
  SET_FB_AUTH_USER,
  SET_USER,
  SET_SIGNUP_NAMES,
} from './types';

let initialState = {
  isCheckingUser: true,
  firebaseAuthUser: null,
  user: null,
  signUpNames: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHECKING_USER:
      return { ...state, isCheckingUser: action.payload };
    case SET_FB_AUTH_USER:
      return { ...state, firebaseAuthUser: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_SIGNUP_NAMES:
      return { ...state, signUpNames: action.payload };

    default:
      return state;
  }
};
