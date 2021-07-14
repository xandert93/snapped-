import {
  TOGGLE_DARK_MODE,
  SET_IS_SUBMITTING,
  SET_SUCCESS_SNACKBAR,
  SET_FAILURE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './types';

let initialState = {
  isDarkMode: true,
  isSubmitting: false,
  snackbar: { isOpen: false, isSuccess: true, message: '' },
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
    default:
      return state;
  }
};
