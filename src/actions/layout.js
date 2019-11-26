import { 
    OPEN_PROJECT_DETAIL_SIDEBAR, 
    CLOSE_PROJECT_DETAIL_SIDEBAR,
    TOGGLE_NAVIGATION_SIDEBAR
} from './types';

export const openProjectDetailSidebarById = id => dispatch => {
    dispatch({
        type: OPEN_PROJECT_DETAIL_SIDEBAR,
        payload: id
    });
}

export const closeProjectDetailSidebar = () => dispatch => {
    dispatch({ 
        type: CLOSE_PROJECT_DETAIL_SIDEBAR,
        payload: -1
    });
}

export const toggleNavigationSidebar = () => dispatch => {
    dispatch({ type: TOGGLE_NAVIGATION_SIDEBAR });
}