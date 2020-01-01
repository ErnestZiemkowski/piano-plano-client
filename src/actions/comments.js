import axios from 'axios';
import api from '../apiUrls';

import setAuthToken from '../utils/setAuthToken';
import {
    GET_ERRORS,
    GET_COMMENTS,
    COMMENTS_LOADING,
    CREATE_COMMENT
} from './types';

export const getCommentsByProjectId = id => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: COMMENTS_LOADING });
    axios
        .get(api.comments.projectById(id))
        .then(res => {
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getCommentsByIssueId = id => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: COMMENTS_LOADING });
    axios
        .get(api.comments.issueById(id))
        .then(res => {
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const createComment = commentData => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.comments.create, commentData)
        .then(res => {
            dispatch({
                type: CREATE_COMMENT,
                payload: res.data
            });
        })
        .catch(err => { 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}