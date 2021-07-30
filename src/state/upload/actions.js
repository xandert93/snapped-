import { setFailureSnackbar, setIsSubmitting } from '../app/actions';

import {
  SET_SELECTED_FILE,
  SET_DATA_URL,
  SET_NEW_POST,
  CLEAR_UPLOAD_FORM,
} from './types';

/**/
export const setSelectedFile = (file) => ({
  type: SET_SELECTED_FILE,
  payload: file,
});

export const setDataURL = (dataURL) => ({
  type: SET_DATA_URL,
  payload: dataURL,
});

export const setNewPost = (description, file) => ({
  type: SET_NEW_POST,
  payload: { description, file },
});

export const clearUploadForm = () => ({ type: CLEAR_UPLOAD_FORM });
/**/
