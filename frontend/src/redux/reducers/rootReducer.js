import { combineReducers } from 'redux';
import alertReducer from './alert.reducer.js';
import authReducer from './auth.reducer.js';

export default combineReducers({
    alertReducer,
    authReducer
});