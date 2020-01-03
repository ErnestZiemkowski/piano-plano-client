import axios from 'axios';
import api from '../apiUrls';

import setAuthToken from '../utils/setAuthToken';
import {
    INVITATIONS_LOADING,
    GET_INVITATIONS,
    CREATE_INVITATION,
    ACCEPT_INVITATION,
    REMOVE_INVITATION,
    GET_ERRORS
} from './types';

export const getInvitations = () => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: INVITATIONS_LOADING });
    axios
        .get(api.invitations.getAll)
        .then(res => {
            dispatch({
                type: GET_INVITATIONS,
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

export const createInvitation = invitationData => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.invitations.create, invitationData)
        .then(res => {
            dispatch({
                type: CREATE_INVITATION,
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

export const acceptInvitation = invitationData => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.invitations.accept, invitationData)
        .then(res => {
            dispatch({
                type: ACCEPT_INVITATION,
                payload: invitationData.id
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const removeInvitation = id => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .delete(api.invitations.removeById(id))
        .then(res => {
            dispatch({
                type: REMOVE_INVITATION,
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