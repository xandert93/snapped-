import { SET_USER_DETAILS, SET_SUCCESS_MESSAGE, SET_FAILURE_MESSAGE, REMOVE_MESSAGE, CLEAR_AUTH_FORM } from './types';

const initialUserDetails = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const initialMessageData = {
  showMessage: false,
  isSuccess: true,
  message: '',
};

const initialState = {
  userDetails: initialUserDetails,
  messageData: initialMessageData,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...payload },
      };
    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        messageData: { showMessage: true, isSuccess: true, message: payload },
      };
    case SET_FAILURE_MESSAGE:
      return {
        ...state,
        messageData: { showMessage: true, isSuccess: false, message: payload },
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        messageData: { ...state.messageData, showMessage: false },
      };
    case CLEAR_AUTH_FORM:
      return {
        ...state,
        userDetails: initialUserDetails,
        messageData: initialMessageData,
      };
    default:
      return state;
  }
};
