import { combineReducers } from 'redux';

import auth from './auth/reducer';
import authForms from './authForms/reducer';
import app from './app/reducer';
import postForm from './postForm/reducer';
import upload from './upload/reducer';
import posts from './posts/reducer';
import profile from './profile/reducer';
import lookups from './lookups/reducer';

const reducersObj = { auth, authForms, app, postForm, upload, posts, profile, lookups };

export default combineReducers(reducersObj);
