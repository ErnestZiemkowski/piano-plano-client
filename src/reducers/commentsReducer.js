import {
    GET_COMMENTS,
    CREATE_COMMENT,
    COMMENTS_LOADING
} from '../actions/types';

const initialState = {
    isLoading: false,
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case COMMENTS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_COMMENTS:
            return {
                ...state,
                isLoading: false,
                data: action.payload    
            };
        case CREATE_COMMENT:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        default:
            return state;
    }
}