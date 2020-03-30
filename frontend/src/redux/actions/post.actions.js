import axios from 'axios';
import { setAlert } from './alert.actions.js';
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

// pobierz pojedyńczego posta
export const getSinglePost = (post_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${post_id}`);

        dispatch({
            type: GET_POST,
            post: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Dodaj post
export const addPost = (formData) => async dispatch => {
    try {
        const config = {
            headers: { "Content-Type": 'application/json' }
        }
    
        // const body = JSON.stringify({name, email, password});

        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            post: res.data
        });

        dispatch(setAlert('Post added', 'success'));
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

// Dodaj komentarz
export const addComment = (post_id, formData) => async dispatch => {
    try {
        const config = {
            headers: { "Content-Type": 'application/json' }
        }

        const res = await axios.post(`/api/posts/comment/${post_id}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            comments: res.data
        });

        dispatch(setAlert('Comment added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// Usuń komentarz
export const removeComment = (post_id, comment_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);

        dispatch({
            type: REMOVE_COMMENT,
            comment_id: comment_id
        });

        dispatch(setAlert('Comment removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            error: { msg: error.response.statusText, status: error.response.status }
        });
    }
};