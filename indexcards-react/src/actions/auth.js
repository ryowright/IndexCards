import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADING,
    USER_LOADED,
} from './types';

// took out await and async
export const login = (username, password) => async dispatch => {
        await axios.post('http://127.0.0.1:8000/account/login/', {
            "username": username,
            "password": password
        }).then(res => {
            if(res.status === 200) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.token,
                    username: username, // ----
                });
                //return res.data;
            }
        });
        /*dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token // ----
        });
        return res.data;*/
    }

    /*
    catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });

    }
}*/

//export const logout = () => dispatch

// Complete this -- checks to see if there is a token stored locally
// and redirects user to cardset page if there is a token and redirects
// to login page if there is none
export const loadUser = () => {
    return (dispatch, getState) => {
        console.log(getState().auth.token);
        dispatch({type: USER_LOADING});
        const token = getState().auth.token;
        console.log(token);
        let headers = {
            "Authorization": null // removed content-type header
        };

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        return axios.get("http://127.0.0.1:8000/account/user/", {headers, })
            .then(response => {
                console.log("Get user request: ");
                console.log(response.data.username); // FINSIH
                if (response.status === 200) {
                    dispatch({
                        type: USER_LOADED,
                        payload: response.data.username
                    })
                }
            },
                error => {
                    console.log('error');
                    console.log(error);
                })
    }
}