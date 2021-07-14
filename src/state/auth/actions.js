import { SET_IS_CHECKING_USER, SET_FB_AUTH_USER, SET_USER } from './types';
import {
  addUserToDb,
  getUserDocFromDb,
} from '../../services/firebase/firestore';

export function authenticateUserRecord(fbAuthUserRecord, signUpNames) {
  return async (dispatch, getState) => {
    dispatch({ type: SET_FB_AUTH_USER, payload: fbAuthUserRecord });

    /* if user has signed in: */
    if (fbAuthUserRecord) {
      /* if user has just created account (as cannot have display name yet),
         create actual user on Firestore "Users" collection: */
      if (!fbAuthUserRecord.displayName) {
        const [username, fullName] = signUpNames;
        await fbAuthUserRecord.updateProfile({ displayName: username });
        await addUserToDb(fbAuthUserRecord, username, fullName);
      }
      /*either way, then get the user doc from Firestore "Users" collection:*/
      const retrievedUserDoc = await getUserDocFromDb(fbAuthUserRecord.uid);
      dispatch({ type: SET_USER, payload: retrievedUserDoc });
    }

    /*if user has just signed out, clear "user" state*/
    if (!fbAuthUserRecord) dispatch({ type: SET_USER, payload: null });

    dispatch({ type: SET_IS_CHECKING_USER, payload: false });
  };
}

//bespoke function created for setUser as it will be needed in many app components
export const setUser = (user) => (dispatch) =>
  dispatch({ type: SET_USER, payload: user });
