import { GET_SETTINGS, SETTINGS_LOADING, UPDATE_SETTINGS } from '../actions/types';

const initialState = {
    isLoading: false,
    backgroundImage: ""
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SETTINGS_LOADING:
            return {
                ...state,
                isLoading: true
            };        
        case GET_SETTINGS:
            return {
                ...state,
                isLoading: false,
                backgroundImage: action.payload.backgroundImageUrl
            };
        case UPDATE_SETTINGS:
            return {
                ...state,
                backgroundImage: action.payload.backgroundImageUrl
            }
        default:
            return state;
    }
}