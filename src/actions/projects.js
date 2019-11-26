import axios from 'axios';
import api from '../apiUrls';

import setAuthToken from '../utils/setAuthToken';
import { 
    GET_PROJECTS,
    GET_ERRORS, 
    PROJECTS_LOADING,
    DELETE_PROJECT,
    CREATE_PROJECT,
    UPDATE_PROJECT
} from './types';

export const getAllProjects = () => dispatch => {

    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: PROJECTS_LOADING });

    axios
        .get(api.projects.getAll)
        .then(res => {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
};

export const deleteProject = id => dispatch => {

    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .delete(api.projects.deleteById + "/" + id)
        .then(res => {
            dispatch({
                type: DELETE_PROJECT,
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

export const createProject = projectData => dispatch => {

    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.projects.create, projectData)
        .then(res => {
            dispatch({
                type: CREATE_PROJECT,
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

export const updateProject = (projectData, id) => dispatch => {

    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .put(api.projects.update(id), projectData)
        .then(res => {
            dispatch({
                type: UPDATE_PROJECT,
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
