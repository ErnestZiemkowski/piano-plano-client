import axios from 'axios';
import api from '../apiUrls';

import setAuthToken from '../utils/setAuthToken';
import { 
    DAILY_GOALS_LOADING,
    GET_DAILY_GOALS,
    TOGGLE_DAILY_GOAL,
    GET_ERRORS
} from './types';

export const toggleDailyGoal = dailyGoal => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.dailyGoals.toggle, dailyGoal)
        .then(res => {
            dispatch({ type: TOGGLE_DAILY_GOAL });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getDailyGoals = () => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: DAILY_GOALS_LOADING });
    axios
        .get(api.dailyGoals.getAll)
        .then(res => {
            dispatch({ 
                type: GET_DAILY_GOALS,
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