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
  // OPEN_CONFIRMATION_DIALOG,
  SET_CONFIRMATION_DIALOG,
  CLOSE_CONFIRMATION_DIALOG,
} from './types';

let initialState = {
  isDarkMode: true,
  isSubmitting: false,
  snackbar: { isOpen: false, isSuccess: true, message: '' },
  isWelcomeDialogOpen: false,
  isClickedPostDialogOpen: false,
  isPostUploadDialogOpen: false,
  isPostEditDialogOpen: false,
  confirmationDialog: {
    isOpen: false,
    title: '',
    content: '',
    choices: [],
    confirmHandler: null,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: !state.isDarkMode };

    case SET_IS_SUBMITTING:
      return { ...state, isSubmitting: payload };

    case SET_SUCCESS_SNACKBAR:
      return {
        ...state,
        snackbar: { isOpen: true, isSuccess: true, message: payload },
      };
    case SET_FAILURE_SNACKBAR:
      return {
        ...state,
        snackbar: { isOpen: true, isSuccess: false, message: payload },
      };
    case REMOVE_SNACKBAR:
      return { ...state, snackbar: { ...state.snackbar, isOpen: false } };

    case OPEN_WELCOME_DIALOG:
      return { ...state, isWelcomeDialogOpen: true };
    case CLOSE_WELCOME_DIALOG:
      return { ...state, isWelcomeDialogOpen: false };

    case OPEN_CLICKED_POST_DIALOG:
      return { ...state, isClickedPostDialogOpen: true };
    case CLOSE_CLICKED_POST_DIALOG:
      return { ...state, isClickedPostDialogOpen: false };

    case OPEN_POST_UPLOAD_DIALOG:
      return { ...state, isPostUploadDialogOpen: true };
    case CLOSE_POST_UPLOAD_DIALOG:
      return { ...state, isPostUploadDialogOpen: false };

    case OPEN_POST_EDIT_DIALOG:
      return { ...state, isPostEditDialogOpen: true };
    case CLOSE_POST_EDIT_DIALOG:
      return { ...state, isPostEditDialogOpen: false };

    // case OPEN_CONFIRMATION_DIALOG:
    //   return { ...state, isConfirmationDialogOpen: true };
    case SET_CONFIRMATION_DIALOG:
      return { ...state, confirmationDialog: payload };
    case CLOSE_CONFIRMATION_DIALOG:
      return {
        ...state,
        confirmationDialog: { ...state.confirmationDialog, isOpen: false },
      };

    default:
      return state;
  }
};
