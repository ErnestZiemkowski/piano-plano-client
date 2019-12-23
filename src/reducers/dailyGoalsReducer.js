import {
    GET_DAILY_GOALS,
    DAILY_GOALS_LOADING,
} from '../actions/types';

const initialState = {
    isLoading: false,
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_DAILY_GOALS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case DAILY_GOALS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
}