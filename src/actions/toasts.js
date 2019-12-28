import {
    GET_TOASTS,
    CREATE_TOAST,
    DELETE_TOAST
} from './types';

export const createToast = toastData => dispatch => {
    console.log('kutas');
    dispatch({
        type: CREATE_TOAST,
        payload: toastData
    });
};

export const getToasts = () => dispatch => {
    dispatch({ type: GET_TOASTS });
};

export const deleteToast = uuid => dispatch => {
    dispatch({
        type: DELETE_TOAST,
        payload: uuid
    });
};