import axios from 'axios';
import {
    CREATE_CARD_SUCCESS,
    CREATE_CARD_FAIL,
    CREATE_CARDSET_SUCCESS,
    CREATE_CARDSET_FAIL,
    RETRIEVE_CARDS,
    RETRIEVE_CARDSETS,
    GET_NEXT_CARD,
    GET_PREV_CARD,
} from './types';


let headers = {
    "Content-Type": "application/json",
};

const token = localStorage.getItem('token');
headers["Authorization"] = `Token ${token}`;


export const createcardset = (title, description, isPrivate) => dispatch => {

    //let body = {
    //    title: title,
    //    description: description,
     //   private: isPrivate
    //};
    
    //console.log(body);
    axios.post("http://127.0.0.1:8000/indexapi/cardsets/", {"title": title, "description": description, "private": isPrivate}, {headers, })
        .then(response => {
            dispatch({
                type: CREATE_CARDSET_SUCCESS,
                payload: response.data,
            });
        }).catch(error => {
            dispatch({
                type: CREATE_CARDSET_FAIL,
                err: error.response
            });
            console.log(error);
        });
}

export const retrievecardsets = () => dispatch => {

    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;

    axios.get("http://127.0.0.1:8000/indexapi/cardsets/", {headers, })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: RETRIEVE_CARDSETS,
                payload: response.data
            })
        }).catch(err => {console.log(err)})
}

export const retrievecards = (id) => dispatch => {

    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;

    let cards = []
    axios.get(`http://127.0.0.1:8000/indexapi/cards/`, {headers, })
        .then(response => {
            cards = response.data.filter(card => card.cardset == id)
            console.log(id);
            console.log(cards);
            dispatch({
                type: RETRIEVE_CARDS,
                payload: cards
            })
        }).catch(err => {console.log(err)})
}

export const nextcard = () => (dispatch, getState) => {
    if (getState().CRUD.counter < getState().CRUD.count){
        dispatch({
            type: GET_NEXT_CARD,
        })
    } else {
        return;
    }
}

export const prevcard = () => (dispatch, getState) => {
    if (getState().CRUD.index > 0){
        dispatch({
            type: GET_PREV_CARD,
        })
    } else {
        return;
    }
}