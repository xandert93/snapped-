import { SET_SELECTED_FILE, SET_DATA_URL, SET_NEW_POST, CLEAR_CREATE_FORM } from './types';

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

export const clearCreateForm = () => ({ type: CLEAR_CREATE_FORM });
/**/
