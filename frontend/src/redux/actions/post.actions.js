import axios from 'axios';
import { setAlert } from './alert.actions.js';
import {
    GET_POSTS,
    DELETE_POST,
    POST_ERROR,
    UPDATE_LIKES
} from '../actions/types.js';

// pobierz wszystkie posty
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            posts: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Usuń post
export const deletePost = (post_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${post_id}`);

        dispatch({
            type: DELETE_POST,
            post_id: post_id
        });

        dispatch(setAlert('Post deleted', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// dodaj polubienie
export const addLike = (post_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { 
                post_id: post_id, 
                likes: res.data 
            }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// usuń polubienie
export const removeLike = (post_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${post_id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { 
                post_id: post_id, 
                likes: res.data 
            }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};