import { combineReducers } from 'redux';

import auth from './auth/reducer';
import authForms from './authForms/reducer';
import app from './app/reducer';
import upload from './upload/reducer';
import profile from './profile/reducer';

const reducersObj = { auth, authForms, app, upload, profile };

export default combineReducers(reducersObj);
