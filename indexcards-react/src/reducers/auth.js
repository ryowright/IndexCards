import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    USER_LOADING,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types';

const initialState = {
    isAuth: false,
    token: localStorage.getItem('token'),
    isLoading: false,
    username: null,
}

export default function auth(state = initialState, action) {
    switch (action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                username: action.username,
                token: action.payload.token, // --
            };
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoading: false,
                isAuth: false,
                username: null,
                token: null
            };

        case USER_LOADING:
            console.log('user loading');
            return {
                ...state,
                isLoading: true
            };

        case USER_LOADED:
            console.log('user loaded');
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                username: action.payload   // action must have a user returned
            };
            
        default:
            return state;
    }
}