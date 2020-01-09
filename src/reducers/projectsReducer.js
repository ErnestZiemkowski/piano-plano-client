import { 
    GET_PROJECTS, 
    PROJECTS_LOADING, 
    DELETE_PROJECT, 
    CREATE_PROJECT, 
    UPDATE_PROJECT,
    TOGGLE_FRIEND_AS_A_PROJECT_MEMBER
} from '../actions/types';

const initialState = {
    isLoading: false,
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case PROJECTS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case CREATE_PROJECT:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case DELETE_PROJECT:
            return {
                ...state,
                data: state.data.filter(project => project.id !== action.payload)
            };
        case TOGGLE_FRIEND_AS_A_PROJECT_MEMBER:
        case UPDATE_PROJECT:
            const index = state.data.findIndex(project => project.id === action.payload.id);
            state.data[index] = action.payload;
            return {
                ...state,
                data: state.data
            };
        default:
            return state;
    }
}