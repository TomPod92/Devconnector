import {
    GET_PROFILE,
    GET_ALL_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_REPOS
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
        case GET_ALL_PROFILES:
            return {...state, profiles: action.profiles, loading: false};
        case UPDATE_PROFILE:
            return {...state, profile: action.profile, loading: false};
        case GET_REPOS:
            return {...state, repos: action.repos, loading: false};
        case PROFILE_ERROR:
            return {...state, error: action.error, loading: false, profile: null};
        case CLEAR_PROFILE:
            return {...state, profile: null, repos: [], loading: false};
        default:
            return state;
    }
};

export default profileReducer;