import { 
    OPEN_PROJECT_DETAIL_SIDEBAR, 
    CLOSE_PROJECT_DETAIL_SIDEBAR,
    TOGGLE_NAVIGATION_SIDEBAR,
    OPEN_ISSUE_DETAILS_MODAL,
    CLOSE_ISSUE_DETAILS_MODAL
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

export const openIssueDetailsModalById = id => dispatch => {
    dispatch({
        type: OPEN_ISSUE_DETAILS_MODAL,
        payload: id
    });
}

export const closeIssueDetailsModal = () => dispatch => {
    dispatch({
        type: CLOSE_ISSUE_DETAILS_MODAL,
        payload: -1
    });    
}