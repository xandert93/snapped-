import {
  fbCreateFollowUsersLookup,
  fbCreateProfilePicsLookup,
} from '../../services/firebase/firestore/users';
import { SET_PROFILE_PICS_LOOKUP, SET_FOLLOW_USERS_LOOKUP } from './types';

export const createProfilePicsLookup = () => {
  return async (dispatch) => {
    const lookup = await fbCreateProfilePicsLookup();

    dispatch({ type: SET_PROFILE_PICS_LOOKUP, payload: lookup });
  };
};

export const createFollowUsersLookup = (followers, following) => {
  return async (dispatch) => {
    const lookup = await fbCreateFollowUsersLookup(followers, following);

    dispatch({ type: SET_FOLLOW_USERS_LOOKUP, payload: lookup });
  };
};
