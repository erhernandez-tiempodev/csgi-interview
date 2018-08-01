import ThunkHelper from '../utilities/thunkHelper';
const API_URL = 'http://localhost:3004';

export const RETRIEVE_POSTS = {
    BEGIN: 'RETRIEVE_POSTS_BEGIN',
    SUCCESS: 'RETRIEVE_POSTS_SUCCESS',
    FAILURE: 'RETRIEVE_POSTS_FAILURE'
};

export const ADD_POST_TO_STORE = {
    SUCCESS: 'ADD_POST_TO_STORE_SUCCESS'
};

export const SAVE_POST_TO_DB = {
    BEGIN: 'SAVE_POST_TO_DB_BEGIN',
    SUCCESS: 'SAVE_POST_TO_DB_SUCCESS',
    FAILURE: 'SAVE_POST_TO_DB_FAILURE'
};

const RETRIEVE_POSTS_EVENTS = [
    RETRIEVE_POSTS.BEGIN,
    RETRIEVE_POSTS.SUCCESS,
    RETRIEVE_POSTS.FAILURE
];

const SAVE_POST_TO_DB_EVENTS = [
    SAVE_POST_TO_DB.BEGIN,
    SAVE_POST_TO_DB.SUCCESS,
    SAVE_POST_TO_DB.FAILURE
];

export const retrievePosts = () => {
    return dispatch => {
        return ThunkHelper(dispatch, RETRIEVE_POSTS_EVENTS, {
            method: 'get',
            url: `${API_URL}/posts`
        });
    }
};

export const addPostToStore = (payload) => {
    return dispatch => {
        dispatch({
            type: ADD_POST_TO_STORE.SUCCESS,
            payload
        });
    }
};

export const savePostToDb = (payload) => {
    return dispatch => {
        return ThunkHelper(dispatch, SAVE_POST_TO_DB_EVENTS, {
            method: 'post',
            url: `${API_URL}/posts`,
            data: payload
        });
    }
};

