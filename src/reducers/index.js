import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import layoutReducer from './layoutReducer';
import projectsReducer from './projectsReducer';
import kanbanCategoriesReducer from './kanbanCategoriesReducer';
import settingsReducer from './settingsReducer';
import dailyGoalsReducer from './dailyGoalsReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    projects: projectsReducer,
    layout: layoutReducer,
    kanbanCategories: kanbanCategoriesReducer,
    settings: settingsReducer,
    dailyGoals: dailyGoalsReducer,
});
