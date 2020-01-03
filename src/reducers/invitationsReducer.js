import {
    INVITATIONS_LOADING,
    GET_INVITATIONS,
    CREATE_INVITATION,
    ACCEPT_INVITATION,
    REMOVE_INVITATION
} from '../actions/types';

const initialState = {
    isLoading: false,
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case INVITATIONS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_INVITATIONS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case CREATE_INVITATION:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case REMOVE_INVITATION:
        case ACCEPT_INVITATION:
            return {
                ...state,
                data: state.data.filter(invitation => invitation.id !== action.payload)
            };
        default:
            return state;
        
    }
};