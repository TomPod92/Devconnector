import axios from 'axios';
import { setAlert } from './alert.actions.js';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from '../actions/types.js';

export const getLoggedUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            profile: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// stwórz lub update'uj profil
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);
        // zapisz profil do reduxa
        dispatch({
            type: GET_PROFILE,
            profile: res.data
        });

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));

        // jeżeli stworzylismy nowy profil przenieś użytkownika na /dashboard
        if(!edit) {
            history.push('/dashboard');
        }

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(current => dispatch(setAlert(current.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            profile: res.data
        });

        dispatch(setAlert('Experience added', 'success'));

        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(current => dispatch(setAlert(current.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            profile: res.data
        });

        dispatch(setAlert('Education added', 'success'));

        history.push('/dashboard');

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors) {
            errors.forEach(current => dispatch(setAlert(current.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
}; 