import { SET_SELECTED_FILE, SET_DATA_URL, CLEAR_CREATE_FORM, SET_NEW_POST } from './types';

let initialState = {
  selectedFile: null,
  confirmedFile: null,
  dataURL: '',
  description: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SELECTED_FILE:
      return {
        ...state,
        selectedFile: payload,
      };
    case SET_DATA_URL:
      return { ...state, dataURL: payload };
    case SET_NEW_POST:
      return {
        ...state,
        confirmedFile: payload.file,
        description: payload.description,
      };
    case CLEAR_CREATE_FORM:
      return initialState;
    default:
      return state;
  }
};
