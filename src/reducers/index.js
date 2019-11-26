import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import projectsReducer from './projectsReducer';
import layoutReducer from './layoutReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    projects: projectsReducer,
    layout: layoutReducer,
});
