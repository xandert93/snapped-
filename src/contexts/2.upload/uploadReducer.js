import {
  SET_FILE_SUCCESS,
  SET_FILE_FAIL,
  SET_DATA_URL,
  RESET_FORM,
  SET_POST_DESCRIPTION,
  SET_CONFIRMED_FILE,
} from './actions';

export const defaultState = {
  msgData: null,
  fileData: { file: null, path: '' },
  file: null,
  dataURL: '',
  description: null,
};

export const uploadReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_FILE_SUCCESS:
      return { ...state, msgData: null, fileData: { file: payload } };
    case SET_FILE_FAIL:
      return {
        ...state,
        msgData: {
          success: false,
          msg: 'Please choose an image file (.png or .jpeg)',
        },
      };
    case SET_DATA_URL:
      return { ...state, dataURL: payload };
    case RESET_FORM:
      return defaultState;
    case SET_POST_DESCRIPTION:
      return { ...state, description: payload };
    case SET_CONFIRMED_FILE:
      return { ...state, file: payload };
    default:
      return state;
  }
};

/*Previously had a:

case CANCEL_FILE: {
      return { ...state, msgData: null, fileData: { file: null, path: '' } };
    }

This should be called if user returns to file picker and cancels their choice. 
However, our UI doesn't allow that, so this block is not required.

*/
