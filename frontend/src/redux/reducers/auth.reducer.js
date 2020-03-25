import { REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types.js';

const initialState = {
    token: localStorage.getItem('devconnector_token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {...state, isAuthenticated: true, loading: false, user: action.user}
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('devconnector_token', action.token);
            return {...state, token: action.token, isAuthenticated: true, loading: false};
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('devconnector_token');
            return {...state, token: null, isAuthenticated: false, loading: false};
        default:
            return state;
    }
};

export default authReducer;