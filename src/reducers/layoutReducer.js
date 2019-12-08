import { 
    OPEN_PROJECT_DETAIL_SIDEBAR, 
    CLOSE_PROJECT_DETAIL_SIDEBAR,
    OPEN_ISSUE_DETAILS_MODAL,
    CLOSE_ISSUE_DETAILS_MODAL,
    TOGGLE_NAVIGATION_SIDEBAR
} from '../actions/types';

const initialState = {
    projectId: -1,
    issueId: -1,
    isNavigatonSidebarOpen: true
};

export default (state = initialState, action) => {

    switch(action.type) {
        case OPEN_PROJECT_DETAIL_SIDEBAR:
            return {
                ...state,
                projectId: action.payload
            };
        case CLOSE_PROJECT_DETAIL_SIDEBAR:
            return {
                ...state,
                projectId: -1
            };
        case TOGGLE_NAVIGATION_SIDEBAR:
            return {
                ...state,
                isNavigatonSidebarOpen: !state.isNavigatonSidebarOpen
            };
        case OPEN_ISSUE_DETAILS_MODAL:
            return {
                ...state,
                issueId: action.payload
            };
        case CLOSE_ISSUE_DETAILS_MODAL:
            return {
                ...state,
                issueId: -1
            };
        default:
            return state;
    }
}