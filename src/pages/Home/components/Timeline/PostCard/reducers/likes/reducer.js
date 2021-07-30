import { TOGGLE_COUNT, TOGGLE_LIKE } from './types';

export default (state, { type, payload }) => {
  switch (type) {
    case TOGGLE_LIKE:
      return { ...state, isLikedByUser: !state.isLikedByUser };
    case TOGGLE_COUNT:
      return { ...state, likesCount: state.likesCount + payload };
    default:
      return state;
  }
};
