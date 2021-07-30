import { TOGGLE_COUNT, TOGGLE_LIKE } from './types';

export const toggleLike = () => ({ type: TOGGLE_LIKE });

export const toggleCount = (num) => ({
  type: TOGGLE_COUNT,
  payload: num,
});
