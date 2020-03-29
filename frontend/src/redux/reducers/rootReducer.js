import { combineReducers } from 'redux';
import alertReducer from './alert.reducer.js';
import authReducer from './auth.reducer.js';
import profileReducer from './profile.reducer.js';
import postReducer from './post.reducer.js';

export default combineReducers({
    alertReducer,
    authReducer,
    profileReducer,
    postReducer
});