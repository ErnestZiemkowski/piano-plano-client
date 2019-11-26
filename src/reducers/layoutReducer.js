import { 
    OPEN_PROJECT_DETAIL_SIDEBAR, 
    CLOSE_PROJECT_DETAIL_SIDEBAR,
    TOGGLE_NAVIGATION_SIDEBAR
} from '../actions/types';

const initialState = {
    projectId: -1,
    isNavigatonSidebarOpen: false
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
        default:
            return state;
    }
}