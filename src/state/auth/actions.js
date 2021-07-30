import {
  SET_IS_CHECKING_USER,
  SET_FB_AUTH_USER,
  SET_USER,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_FOLLOWING,
  UPDATE_PREV_USER_FOLLOWING,
} from './types';

import {
  addUserToDb,
  fbGetUser,
} from '../../services/firebase/firestore/users';

import { setIsSubmitting, setSuccessSnackbar } from '../app/actions';

/**/
export const setIsCheckingUser = (bool) => ({
  type: SET_IS_CHECKING_USER,
  payload: bool,
});

export const setFbAuthUser = (fbAuthUser) => ({
  type: SET_FB_AUTH_USER,
  payload: fbAuthUser,
});

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const updateUserProfilePicture = (url) => ({
  type: UPDATE_USER_PROFILE_PICTURE,
  payload: url,
});

export const updateUserFollowing = (altUserUsername, isAltUserFollowed) => ({
  type: UPDATE_USER_FOLLOWING,
  payload: { altUserUsername, isAltUserFollowed },
});

export const updatePrevUserFollowing = () => ({
  type: UPDATE_PREV_USER_FOLLOWING,
});

/**/

export function authenticateUserRecord(fbAuthUser) {
  return async (dispatch, getState) => {
    dispatch(setFbAuthUser(fbAuthUser));

    /* if user has signed in: */
    if (fbAuthUser) {
      /* if user has just created account (as cannot have display name yet),
         create actual user on Firestore "Users" collection: */
      if (!fbAuthUser.displayName) {
        const { username, fullName } = getState().authForms.userDetails;
        await fbAuthUser.updateProfile({ displayName: username });
        await addUserToDb(fbAuthUser, username, fullName);
        dispatch(setSuccessSnackbar('Account successfully created.'));
      }
      /*either way, then get the user doc from Firestore "Users" collection:*/
      const retrievedUserDoc = await fbGetUser(fbAuthUser.uid);
      dispatch(setUser(retrievedUserDoc));
    }

    /*if user has just signed out, clear "user" state*/
    if (!fbAuthUser) dispatch(setUser(null));

    dispatch(setIsCheckingUser(false));
    dispatch(setIsSubmitting(false));
  };
}
