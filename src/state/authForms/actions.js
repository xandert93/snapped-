import {
  SET_USER_DETAILS,
  SET_SUCCESS_MESSAGE,
  SET_FAILURE_MESSAGE,
  REMOVE_MESSAGE,
  CLEAR_AUTH_FORM,
} from './types';

import { setIsSubmitting } from '../app/actions';
import {
  fbLogin,
  fbRegister,
  fbResetPassword,
} from '../../services/firebase/auth';
import { checkUsernameTaken } from '../../services/firebase/firestore/users';

/**/
export const setUserDetails = (detailObj) => ({
  type: SET_USER_DETAILS,
  payload: detailObj,
});

export const setSuccessMessage = (message) => ({
  type: SET_SUCCESS_MESSAGE,
  payload: message,
});

export const setFailureMessage = (message) => ({
  type: SET_FAILURE_MESSAGE,
  payload: message,
});

export const removeMessage = () => ({ type: REMOVE_MESSAGE });

export const clearAuthForm = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_FORM });
  //remove?
  dispatch(setIsSubmitting(false));
};
/**/

//do something about this
export const inputChangeHandler = (e) => (dispatch) =>
  dispatch(setUserDetails({ [e.target.name]: e.target.value }));

export function attemptRegister() {
  return async (dispatch, getState) => {
    const { username, passwordConfirm, email, password } =
      getState().authForms.userDetails;

    if (username.length < 5) {
      dispatch(setIsSubmitting(false));
      dispatch(setFailureMessage('Username must be at least 6 characters.'));
      return;
    }

    if (password !== passwordConfirm) {
      dispatch(setIsSubmitting(false));
      dispatch(setFailureMessage('Passwords do not match.'));
      return;
    }

    //Wouldn't allow 3 word names
    // if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName)) {
    //   dispatch(setIsSubmitting(false));
    //   return dispatch(setFailureMessage())({ isSuccess: false, msg: 'Please enter a valid name.' });
    // }

    if (await checkUsernameTaken(username)) {
      dispatch(setIsSubmitting(false));
      dispatch(setFailureMessage('That username is already taken.'));
      return;
    }

    try {
      await fbRegister(email, password); //when successful, fires onAuthStateChanged(userRecord => {}), which adds full user to DB
    } catch (err) {
      dispatch(setIsSubmitting(false));
      dispatch(setFailureMessage(err.message));
    }
  };
}

export function attemptLogin() {
  return async (dispatch, getState) => {
    const { email, password } = getState().authForms.userDetails;
    try {
      await fbLogin(email, password);
      setTimeout(dispatch, 1000, setIsSubmitting(false));
      //we don't do setSubmitting(false) immediately here as the login button is reenabled before redirect
    } catch (err) {
      dispatch(setIsSubmitting(false));
      dispatch(setFailureMessage(err.message));
    }
  };
}

export function attemptPasswordReset() {
  return async (dispatch, getState) => {
    const email = getState().authForms.userDetails.email;
    try {
      await fbResetPassword(email);
      dispatch(
        setSuccessMessage('Please check your inbox for further instructions.')
      );
    } catch (err) {
      dispatch(setIsSubmitting(false));
      dispatch(setFailureMessage('This email address is not on our database.'));
    }
  };
}
