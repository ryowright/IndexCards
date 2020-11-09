import axios from 'axios';
import dispatch from 'redux';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';

export const login = ({username, password}) => async dispatch => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/account/login/', {
            "username": username,
            "password": password
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token // ----
        });
    }
    catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });

    }
}