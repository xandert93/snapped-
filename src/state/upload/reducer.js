import {
  SET_SELECTED_FILE,
  SET_DATA_URL,
  CLEAR_UPLOAD_FORM,
  SET_NEW_POST,
} from './types';

let initialState = {
  fileData: { file: null, path: '' },
  file: null,
  dataURL: '',
  description: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_FILE:
      return { ...state, fileData: { file: payload } };
    case SET_DATA_URL:
      return { ...state, dataURL: payload };
    case SET_NEW_POST:
      return { ...state, file: payload.file, description: payload.description };
    case CLEAR_UPLOAD_FORM:
      return initialState;
    default:
      return state;
  }
};
