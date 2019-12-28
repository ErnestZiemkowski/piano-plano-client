import axios from 'axios';
import api from '../apiUrls';

import setAuthToken from '../utils/setAuthToken';
import { 
    KANBAN_CATEGORIES_LOADING,
    GET_KANBAN_CATEGORIES, 
    CREATE_KANBAN_CATEGORY,
    UPDATE_KANBAN_CATEGORY,
    DELETE_KANBAN_CATEGORY,
    GET_ERRORS,
    REARANGE_KANBAN_BOARD,
    DELETE_CARD,
    CREATE_CARD,
    UPDATE_CARD
} from './types';


export const getKanbanCategoriesByProjectId = projectId => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    dispatch({ type: KANBAN_CATEGORIES_LOADING });
    axios
        .get(api.projects.kanbanCategories.getByProjectId(projectId))
        .then(res => {
            dispatch({
                type: GET_KANBAN_CATEGORIES,
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

export const createKanbanCategory = kanbanCategoryData => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.kanbanCategories.create, kanbanCategoryData)
        .then(res => {
            dispatch({
                type: CREATE_KANBAN_CATEGORY,
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

export const updateKanbanCategory = (kanbanCategoryData, kanbanId) => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));    
    axios
        .put(api.kanbanCategories.updateById(kanbanId), kanbanCategoryData)
        .then(res => {
            dispatch({
                type: UPDATE_KANBAN_CATEGORY,
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

export const deleteKanbanCategory = id => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));  
    axios
        .delete(api.kanbanCategories.deleteById(id))
        .then(res => {
            dispatch({
                type: DELETE_KANBAN_CATEGORY,
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

export const rearangeKanbanBoard = kanbanCategoriesData => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.kanbanCategories.rearangePosition, kanbanCategoriesData)
        .then(res => {
            dispatch({ type: REARANGE_KANBAN_BOARD });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const deleteCard = id => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .delete(api.cards.deleteById(id))
        .then(res => {
            dispatch({ 
                type: DELETE_CARD,
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

export const createCard = cardData => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .post(api.cards.create, cardData)
        .then(res => {
            dispatch({
                type: CREATE_CARD,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const updateCard = (cardData, id) => dispatch => {
    setAuthToken(localStorage.getItem("jwtToken"));
    axios
        .put(api.cards.updateById(id), cardData)
        .then(res => {
            dispatch({
                type: UPDATE_CARD,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};