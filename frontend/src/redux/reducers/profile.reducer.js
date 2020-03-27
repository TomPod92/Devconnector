import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE
} from '../actions/types.js';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return {...state, profile: action.profile, loading: false};
        case UPDATE_PROFILE:
            return {...state, profile: action.profile, loading: false};
        case PROFILE_ERROR:
            return {...state, error: action.error, loading: false};
        case CLEAR_PROFILE:
            return {...state, profile: null, repos: [], loading: false}
        default:
            return state;
    }
};

export default profileReducer;