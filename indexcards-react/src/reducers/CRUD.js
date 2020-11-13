import {
    CREATE_CARD_SUCCESS,
    CREATE_CARD_FAIL,
    CREATE_CARDSET_SUCCESS,
    CREATE_CARDSET_FAIL,
    RETRIEVE_CARDSETS,
    RETRIEVE_CARDS,
    GET_NEXT_CARD,
    GET_PREV_CARD,
} from '../actions/types';

const initialState = {
    data: null,
    error: null,
    cardsets: [],
    cards: [],
    index: 0,
    count: 0,
    counter: 1,
}

export default function CRUD(state = initialState, action) {
    switch(action.type){
        case CREATE_CARDSET_SUCCESS:
        case CREATE_CARD_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };

        case CREATE_CARDSET_FAIL:
        case CREATE_CARD_FAIL:
            return {
                ...state,
                error: action.err,
            };
        case RETRIEVE_CARDSETS:
            return {
                ...state,
                cardsets: action.payload,
                index: 0,
                count: 0,
                counter: 1,
            }
        case RETRIEVE_CARDS:
            return {
                ...state,
                cards: action.payload,
                count: action.payload.length,
            }
        case GET_NEXT_CARD:
            return {
                ...state,
                index: state.index + 1,
                counter: state.counter + 1,
            }
        case GET_PREV_CARD:
            return {
                ...state,
                index: state.index - 1,
                counter: state.counter - 1,
            }
        default:
            return state
    }
}