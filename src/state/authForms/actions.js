import {
  SET_USER_DETAILS,
  SET_SUCCESS_MESSAGE,
  SET_FAILURE_MESSAGE,
  REMOVE_MESSAGE,
  CLEAR_FORM,
} from './types';

import { setIsSubmitting } from '../app/actions';
import { login, register, resetPassword } from '../../services/firebase/auth';
import { checkUsernameTaken } from '../../services/firebase/firestore';

/**/
export const setUserDetails = (detailObj) => (dispatch) =>
  dispatch({ type: SET_USER_DETAILS, payload: detailObj });

export const setSuccessMessage = (message) => (dispatch) =>
  dispatch({ type: SET_SUCCESS_MESSAGE, payload: message });

export const setFailureMessage = (message) => (dispatch) =>
  dispatch({ type: SET_FAILURE_MESSAGE, payload: message });

export const removeMessage = () => (dispatch) =>
  dispatch({ type: REMOVE_MESSAGE });

export const clearForm = () => (dispatch) => {
  dispatch({ type: CLEAR_FORM });
  dispatch(setIsSubmitting(false));
};
/**/

export const inputChangeHandler = (e) => (dispatch) =>
  dispatch(setUserDetails({ [e.target.name]: e.target.value }));

export const attemptRegister =
  (signUpNamesRef) => async (dispatch, getState) => {
    const { email, password, passwordConfirm, username, fullName } =
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
      await register(email, password, username, fullName, signUpNamesRef);
    } catch (err) {
      dispatch(setFailureMessage(err.message));
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

export const attemptLogin = () => async (dispatch, getState) => {
  const { email, password } = getState().authForms.userDetails;
  try {
    await login(email, password);
    setTimeout(dispatch, 1000, setIsSubmitting(false));
    //we don't do setSubmitting(false) immediately here as the login button is reenabled before redirect
  } catch (err) {
    dispatch(setIsSubmitting(false));
    dispatch(setFailureMessage(err.message));
  }
};

export const attemptPasswordReset = () => async (dispatch, getState) => {
  const email = getState().authForms.userDetails.email;
  try {
    await resetPassword(email);
    dispatch(
      setSuccessMessage('Please check your inbox for further instructions.')
    );
  } catch (err) {
    dispatch(setIsSubmitting(false));
    dispatch(setFailureMessage('This email address is not on our database.'));
  }
};
