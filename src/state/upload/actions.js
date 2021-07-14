import { setFailureSnackbar, setIsSubmitting } from '../app/actions';

import {
  SET_SELECTED_FILE,
  SET_DATA_URL,
  CREATE_POST,
  CLEAR_FORM,
} from './types';

/**/
export const setSelectedFile = (file) => (dispatch) =>
  dispatch({ type: SET_SELECTED_FILE, payload: file });

export const setDataURL = (dataURL) => (dispatch) =>
  dispatch({ type: SET_DATA_URL, payload: dataURL });

export const clearForm = () => (dispatch) => dispatch({ type: CLEAR_FORM });
/**/

export const checkFile = (selectedFile, reader) => (dispatch) => {
  if (selectedFile) {
    if (['image/png', 'image/jpeg'].includes(selectedFile.type)) {
      dispatch(setSelectedFile(selectedFile));
      reader.readAsDataURL(selectedFile);
      return;
    } else {
      return dispatch(
        setFailureSnackbar('Please choose an image file (.png or .jpeg)')
      );
    }
  } else return;
};

export const createPost = (description, file) => (dispatch) => {
  dispatch({ type: CREATE_POST, payload: { description, file } });
  dispatch(setIsSubmitting(false));
};
