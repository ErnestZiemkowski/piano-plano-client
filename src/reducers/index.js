import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import toastReducer from './toastReducer';
import layoutReducer from './layoutReducer';
import friendsReducer from './friendsReducer';
import invitationsReducer from './invitationsReducer';
import projectsReducer from './projectsReducer';
import settingsReducer from './settingsReducer';
import commentsReducer from './commentsReducer';
import dailyGoalsReducer from './dailyGoalsReducer';
import kanbanCategoriesReducer from './kanbanCategoriesReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    layout: layoutReducer,
    toasts: toastReducer,
    friends: friendsReducer,
    projects: projectsReducer,
    settings: settingsReducer,
    comments: commentsReducer,
    dailyGoals: dailyGoalsReducer,
    invitations: invitationsReducer,
    kanbanCategories: kanbanCategoriesReducer,
});
