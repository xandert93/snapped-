import {
  TOGGLE_DARK_MODE,
  SET_IS_SUBMITTING,
  SET_SUCCESS_SNACKBAR,
  SET_FAILURE_SNACKBAR,
  REMOVE_SNACKBAR,
  OPEN_WELCOME_DIALOG,
  CLOSE_WELCOME_DIALOG,
  OPEN_CLICKED_POST_DIALOG,
  CLOSE_CLICKED_POST_DIALOG,
  OPEN_POST_UPLOAD_DIALOG,
  CLOSE_POST_UPLOAD_DIALOG,
  OPEN_POST_EDIT_DIALOG,
  CLOSE_POST_EDIT_DIALOG,
  OPEN_CONFIRMATION_DIALOG,
  CLOSE_CONFIRMATION_DIALOG,
  SET_CONFIRMATION_DIALOG,
} from './types';

export const toggleDarkMode = () => ({ type: TOGGLE_DARK_MODE });

export const setIsSubmitting = (bool) => ({
  type: SET_IS_SUBMITTING,
  payload: bool,
});

//SNACKBAR
export const setSuccessSnackbar = (message) => ({
  type: SET_SUCCESS_SNACKBAR,
  payload: message,
});

export const setFailureSnackbar = (message) => ({
  type: SET_FAILURE_SNACKBAR,
  payload: message,
});

export const removeSnackbar = () => ({ type: REMOVE_SNACKBAR });

//DIALOGS
export const openWelcomeDialog = () => ({ type: OPEN_WELCOME_DIALOG });

export const closeWelcomeDialog = () => ({ type: CLOSE_WELCOME_DIALOG });

export const openClickedPostDialog = () => ({ type: OPEN_CLICKED_POST_DIALOG });

export const closeClickedPostDialog = () => ({ type: CLOSE_CLICKED_POST_DIALOG });

export const openPostUploadDialog = () => ({ type: OPEN_POST_UPLOAD_DIALOG });

export const closePostUploadDialog = () => ({ type: CLOSE_POST_UPLOAD_DIALOG });

export const openPostEditDialog = () => ({ type: OPEN_POST_EDIT_DIALOG });

export const closePostEditDialog = () => ({ type: CLOSE_POST_EDIT_DIALOG });

export const setConfirmationDialog = (dialogData) => ({
  type: SET_CONFIRMATION_DIALOG,
  payload: dialogData,
});

// export const openConfirmationDialog = () => ({
//   type: OPEN_CONFIRMATION_DIALOG,
// });

export const closeConfirmationDialog = () => ({ type: CLOSE_CONFIRMATION_DIALOG });
