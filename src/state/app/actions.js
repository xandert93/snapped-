import {
  TOGGLE_DARK_MODE,
  SET_IS_SUBMITTING,
  SET_SUCCESS_SNACKBAR,
  SET_FAILURE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './types';

export const toggleDarkMode = () => (dispatch) =>
  dispatch({ type: TOGGLE_DARK_MODE });

export const setIsSubmitting = (bool) => (dispatch) =>
  dispatch({ type: SET_IS_SUBMITTING, payload: bool });

export const setSuccessSnackbar = (message) => (dispatch) =>
  dispatch({ type: SET_SUCCESS_SNACKBAR, payload: message });

export const setFailureSnackbar = (message) => (dispatch) =>
  dispatch({ type: SET_FAILURE_SNACKBAR, payload: message });

export const removeSnackbar = () => (dispatch) =>
  dispatch({ type: REMOVE_SNACKBAR });
