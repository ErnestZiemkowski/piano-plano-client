import {
    GET_TOASTS,
    CREATE_TOAST,
    DELETE_TOAST
} from "../actions/types";
import uuid from 'uuid/v1'

const initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_TOASTS:
            return state;
        case CREATE_TOAST:
            const toast = {
                id: uuid(),
                header: action.payload.header,
                body: action.payload.body,
                type: action.payload.type
            };
            console.log('huj');
            return {
                ...state,
                data: [...state.data, toast]
            };
        case DELETE_TOAST:
            return {
                ...state,
                data: state.data.filter(toast => toast.id !== action.payload)
            };
        default:
            return state;
    }
}