import {
    CREATE_KANBAN_CATEGORY,
    DELETE_KANBAN_CATEGORY,
    UPDATE_KANBAN_CATEGORY,
    GET_KANBAN_CATEGORIES,
    KANBAN_CATEGORIES_LOADING,
    REARANGE_KANBAN_BOARD,
    CREATE_CARD,
    DELETE_CARD,
    UPDATE_CARD
} from '../actions/types';
import _ from 'lodash';

const initialState = {
    isLoading: false,
    data: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_KANBAN_CATEGORIES:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case KANBAN_CATEGORIES_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_KANBAN_CATEGORY:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case DELETE_KANBAN_CATEGORY:
            return {
                ...state,
                data: state.data.filter(kanbanCategory => kanbanCategory.id !== action.payload)
            };
        case UPDATE_KANBAN_CATEGORY:
            const index = state.data.findIndex(project => project.id !== action.payload);
            state.data[index] = action.payload;
            return {
                ...state,
                data: state.data
            };
        case DELETE_CARD:
            const cards = state.data[0].cards.filter(card => card.id !== action.payload);
            let kanbanCategories = state.data;
            kanbanCategories[0].cards = cards;
            return {
                ...state,
                data: kanbanCategories
            };
        case CREATE_CARD:
            state.data[0].cards.push(action.payload);
            return {
                ...state,
                data: [...state.data]
            };
        case UPDATE_CARD:
            let cardRows = _.clone(state.data.map(category => category.cards));
            cardRows = cardRows.map(cardRow => {
                return cardRow.map(card => {
                    if(card.id === action.payload.id) card = action.payload
                    return card;
                })
            });
            const data = state.data.map((category, index) => {
                category.cards = cardRows[index];
                return category;
            });

            return {
                ...state,
                data: data
            };
        case REARANGE_KANBAN_BOARD:
        default:
            return state;
    }
}
