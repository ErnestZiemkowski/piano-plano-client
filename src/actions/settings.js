import axios from 'axios';
import api from '../apiUrls';
import setAuthToken from '../utils/setAuthToken';
import { GET_SETTINGS, SETTINGS_LOADING, GET_ERRORS, UPDATE_SETTINGS } from './types';

export const getSettings = () => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: SETTINGS_LOADING });

    axios
        .get(api.settings.get)
        .then(res => {
            dispatch({
                type: GET_SETTINGS,
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

export const updateSettings = settingsData => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));

    axios
        .post(api.settings.update, settingsData)
        .then(res => {
            dispatch({
                type: UPDATE_SETTINGS,
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
