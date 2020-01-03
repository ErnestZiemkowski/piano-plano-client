import {
    GET_FRIENDS,
    REMOVE_FRIEND,
    FRIENDS_LOADING
} from '../actions/types';

const initialState = {
    isLoading: false,
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FRIENDS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_FRIENDS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };    
        case REMOVE_FRIEND:
            return {
                ...state,
                data: state.data.filter(friend => friend.id !== action.payload)
            };
        default:
            return state;
        
    }
};