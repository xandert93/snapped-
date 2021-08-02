import { SET_IS_DESCRIPTION_SAME, SET_IS_TAGS_VALID } from './types';

let initialState = {
  isTagsValid: true,
  isDescriptionSame: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_DESCRIPTION_SAME:
      return { ...state, isDescriptionSame: payload };

    case SET_IS_TAGS_VALID:
      return { ...state, isTagsValid: payload };

    default:
      return state;
  }
};
