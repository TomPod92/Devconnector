import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    DELETE_POST,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT,
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
        case GET_POST:
            return {...state, post: action.post, loading: false};
        case ADD_POST:
            return {...state, posts: [action.post, ...state.posts], loading: false};
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
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: action.comments},
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: state.post.comments.filter(current => current._id !== action.comment_id)},
                loading: false
            }
        default:
            return state;
    };
};

export default postReducer;