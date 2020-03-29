import {
    GET_POSTS,
    DELETE_POST,
    POST_ERROR,
    UPDATE_LIKES,
} from '../actions/types.js';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POSTS:
            return {...state, posts: action.posts, loading: false};
        case DELETE_POST:
            return {
                ...state, 
                posts: state.posts.filter(current => current._id !== action.post_id),
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state, 
                posts: state.posts.map(current => current._id === action.payload.post_id ? { ...current, likes: action.payload.likes } : current),
                loading: false 
            };
        case POST_ERROR:
            return {...state, error: action.error, loading: false};
        default:
            return state;
    };
};

export default postReducer;