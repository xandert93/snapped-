import {
  SET_IS_CHECKING_USER,
  SET_FB_AUTH_USER,
  SET_USER,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_FOLLOWING,
  UPDATE_PREV_USER_FOLLOWING,
  UPDATE_USER_DETAILS,
} from './types';

import {
  addUserToDb,
  fbGetUser,
  fbUpdateUserDetails,
  fbUpdateUserProfilePicture,
} from '../../services/firebase/firestore/users';

import { closeWelcomeDialog, openWelcomeDialog, setIsSubmitting, setSuccessSnackbar } from '../app/actions';
import { clearPostsState } from '../posts/actions';
import { fbUploadUserProfilePicture } from '../../services/firebase/storage/users';

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

export const updateUserProfilePicture = (file) => async (dispatch, getState) => {
  const { username, id } = getState().auth.user;

  const url = await fbUploadUserProfilePicture(username, file);
  await fbUpdateUserProfilePicture(id, url);

  dispatch({ type: UPDATE_USER_PROFILE_PICTURE, payload: url });
  dispatch(setSuccessSnackbar('Your profile picture has been updated.'));
};

export const updateUserDetails = (updateObj) => async (dispatch, getState) => {
  dispatch(setIsSubmitting(true));

  const { id } = getState().auth.user;
  await fbUpdateUserDetails(id, updateObj);

  dispatch({ type: UPDATE_USER_DETAILS, payload: updateObj });
  dispatch(closeWelcomeDialog());
  dispatch(setSuccessSnackbar('Your details have been updated.'));
  dispatch(setIsSubmitting(false));
};

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
        const { username, name } = getState().authForms.userDetails;
        await fbAuthUser.updateProfile({ displayName: username });
        await addUserToDb(fbAuthUser, username, name);
        dispatch(setSuccessSnackbar('Account successfully created.'));
      }
      /*either way, then get the user doc from Firestore "Users" collection:*/
      const retrievedUserDoc = await fbGetUser(fbAuthUser.uid);
      dispatch(setUser(retrievedUserDoc));

      let {
        details: { bio },
        profilePicURL,
        followers,
      } = retrievedUserDoc;

      // let isUserNew = !profilePicURL && !bio && followers.length < 3;
      true && dispatch(openWelcomeDialog());
    }

    /*if user has just signed out, clear "user" and "posts" state*/
    if (!fbAuthUser) {
      dispatch(setUser(null));
      dispatch(clearPostsState());
    }

    dispatch(setIsCheckingUser(false));
    dispatch(setIsSubmitting(false));
  };
}
