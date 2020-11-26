import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADING,
    USER_LOADED,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

let domain = 'http://127.0.0.1:8000'

export const login = (username, password) => dispatch => {
        axios.post("/auth/login/", {
            "username": username,
            "password": password
        }).then(res => {
            if(res.status === 200) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                    username: username, // ----
                });
                return res.data;
            }
        }).catch(error => {
            if (error.response.status == 400) {
                alert(`Unable to login: incorrect username and/or password.`);
            } else {
                alert(error.response.non_field_errors);
            }
            dispatch({
                type: LOGIN_FAIL,
            })
        });
    }


export const logout = () => (dispatch, getState) => {
    axios.post("/auth/logout/", null, tokenConfig(getState)) //post takes url, data, config
        .then(response => {dispatch({
            type: LOGOUT_SUCCESS,
        });
    })
}


export const register = (username, password, email) => (dispatch) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
    const body = {
        "username": username,
        "password": password,
        "email": email
    }
    
    axios.post("/auth/register/", body, config)
        .then(response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data,
                username: username,
            });
        }).catch(error => {
            if (error.response.data.email) {
                alert("Invalid email address. Make sure to use format: name@example.com");
            } else if (error.response.data.username) {
                alert("Username is already taken. Please try a different username.");
            }
            dispatch({
                type: REGISTER_FAIL,
                payload: error,
            });
        })
    
}


export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({type: USER_LOADING});
        
        return axios.get("/auth/user/", tokenConfig(getState)) //get request takes url, config
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: USER_LOADED,
                        payload: response.data.username
                    })
                }
            },
                error => {
                    console.log('User load failed');
                    console.log(error);
                })
    }
}


export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };