import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    USER_LOADING,
} from '../actions/types';

const initialState = {
    isAuth: false,
    token: localStorage.getItem('token'),
    isLoading: false,
    username: null,
}

export default function auth(state = initialState, action) {
    switch (action.type){
        case LOGIN_SUCCESS:
            console.log('success');
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                username: action.username,
                ...action.payload //
            };
        case LOGIN_FAIL:
            console.log('fail');
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
            }
        case USER_LOADED:
            console.log('user loaded');
            //console.log
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                username: action.payload   // action must have a user returned
            }
        default:
            return state;
    }
}