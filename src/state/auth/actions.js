import {
  SET_IS_CHECKING_USER,
  SET_FB_AUTH_USER,
  SET_USER,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_FOLLOWING,
} from './types';

import {
  addUserToDb,
  getUserDocFromDb,
} from '../../services/firebase/firestore';

import { setIsSubmitting, setSuccessSnackbar } from '../app/actions';

/**/
export const setIsCheckingUser = (bool) => ({
  type: SET_IS_CHECKING_USER,
  payload: bool,
});

export const setFbAuthUser = (fbAuthUserRecord) => ({
  type: SET_FB_AUTH_USER,
  payload: fbAuthUserRecord,
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

/**/

export function authenticateUserRecord(fbAuthUserRecord) {
  return async (dispatch, getState) => {
    dispatch(setFbAuthUser(fbAuthUserRecord));

    /* if user has signed in: */
    if (fbAuthUserRecord) {
      /* if user has just created account (as cannot have display name yet),
         create actual user on Firestore "Users" collection: */
      if (!fbAuthUserRecord.displayName) {
        const { username, fullName } = getState().authForms.userDetails;
        await fbAuthUserRecord.updateProfile({ displayName: username });
        await addUserToDb(fbAuthUserRecord, username, fullName);
        dispatch(setSuccessSnackbar('Account successfully created.'));
      }
      /*either way, then get the user doc from Firestore "Users" collection:*/
      const retrievedUserDoc = await getUserDocFromDb(fbAuthUserRecord.uid);
      dispatch(setUser(retrievedUserDoc));
    }

    /*if user has just signed out, clear "user" state*/
    if (!fbAuthUserRecord) dispatch(setUser(null));

    dispatch(setIsCheckingUser(false));
    dispatch(setIsSubmitting(false));
  };
}
