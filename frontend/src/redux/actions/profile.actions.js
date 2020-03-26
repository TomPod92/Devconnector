import axios from 'axios';
import { setAlert } from './alert.actions.js';
import {
    GET_PROFILE,
    PROFILE_ERROR,
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
}