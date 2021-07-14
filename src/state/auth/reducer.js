import { SET_IS_CHECKING_USER, SET_FB_AUTH_USER, SET_USER } from './types';

let initialState = {
  isCheckingUser: true,
  firebaseAuthUser: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHECKING_USER:
      return { ...state, isCheckingUser: action.payload };
    case SET_FB_AUTH_USER:
      return { ...state, firebaseAuthUser: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
