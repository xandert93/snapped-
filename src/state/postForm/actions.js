import { SET_IS_DESCRIPTION_SAME, SET_IS_TAGS_VALID } from './types';

export const setIsDescriptionSame = (bool) => ({ type: SET_IS_DESCRIPTION_SAME, payload: bool });

export const setIsTagsValid = (bool) => ({ type: SET_IS_TAGS_VALID, payload: bool });
