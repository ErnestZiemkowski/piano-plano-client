import axios from 'axios';
import api from '../apiUrls';

import setAuthToken from '../utils/setAuthToken';
import {
    FRIENDS_LOADING,
    GET_FRIENDS,
    REMOVE_FRIEND,
    GET_ERRORS,
} from './types';

export const getFriends = () => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: FRIENDS_LOADING });
    axios
        .get(api.friends.getAll)
        .then(res => {
            dispatch({
                type: GET_FRIENDS,
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

export const removeFriend = id => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .delete(api.friends.removeFriendById(id))
        .then(res => {
            dispatch({
                type: REMOVE_FRIEND,
                payload: id
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};