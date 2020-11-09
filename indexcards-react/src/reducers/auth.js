import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types';

const initialState = {
    isAuth: false,
    token: localStorage.getItem('token')
}

export default function(state = initialState, action) {
    switch (action.type){
        case LOGIN_SUCCESS:
            console.log('success')
            localStorage.setItem('token', action.payload.token);
            return {
                isAuth: true
            };
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                isAuth: false
            };
    }
}