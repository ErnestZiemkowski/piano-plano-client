import axios from 'axios';
import api from '../apiUrls';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from "jwt-decode";

import { 
    SET_CURRENT_USER,
    GET_ERRORS,
    USER_LOADING
} from './types';


export const register = (userData, history) => dispatch => {
    axios
        .post(api.auth.register, userData)
        .then(res => history.push("/login"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}


export const login = userData => dispatch => {
    axios
        .post(api.auth.login, userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwtDecode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};
