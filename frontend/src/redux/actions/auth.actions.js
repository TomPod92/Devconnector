import axios from 'axios';
import { setAlert } from './alert.actions.js';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT 
} from '../actions/types.js';
import setAuthToken from '../../helpers/setAuthToken.js';
//---------------------------------------------------------------------------------
export const loadUser = () => async dispatch => {
    if(localStorage.getItem('devconnector_token')) {
        setAuthToken(localStorage.getItem('devconnector_token'));
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            user: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};
//---------------------------------------------------------------------------------
export const registerUser = (name, email, password) => async dispatch => {
    const config = {
        headers: { "Content-Type": 'application/json' }
    }

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post('/api/users', body, config);

        // zwrócony zostanie nam token, który zapiszemy w redux'ie oraz w localStorage
        dispatch({
            type: REGISTER_SUCCESS,
            token: res.data.token
        });

        // pobierz użytkownika na podstawie tokena, który właśnie znalazł się w localStorage    
        dispatch(loadUser);

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(current => dispatch(setAlert(current.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};
//---------------------------------------------------------------------------------
export const loginUser = (email, password) => async dispatch => {
    const config = {
        headers: { "Content-Type": 'application/json' }
    }

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('/api/auth', body, config);
        // zwrócony zostanie nam token, który zapiszemy w redux'ie oraz w localStorage
        dispatch({
            type: LOGIN_SUCCESS,
            token: res.data.token
        });

        // pobierz użytkownika na podstawie tokena, który właśnie znalazł się w localStorage
        dispatch(loadUser);

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(current => dispatch(setAlert(current.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};
//---------------------------------------------------------------------------------
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
};