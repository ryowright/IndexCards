import axios from 'axios';
import {
    CREATE_CARD_SUCCESS,
    CREATE_CARD_FAIL,
    CREATE_CARDSET_SUCCESS,
    CREATE_CARDSET_FAIL,
    RETRIEVE_CARDS,
    RETRIEVE_CARDSETS,
    DELETE_CARDSET,
    GET_NEXT_CARD,
    GET_PREV_CARD,
    UPDATE_CARD,
    UPDATE_CARDSET,
    DELETE_CARD,

} from './types';


// CARDSET ACTIONS -----------------------------------------------------------------------------------------------
export const createcardset = (title, description, isPrivate) => dispatch => {

    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;
    
    axios.post("http://127.0.0.1:8000/indexapi/cardsets/", {"title": title, "description": description, "private": isPrivate}, {headers, })
        .then(response => {
            dispatch({
                type: CREATE_CARDSET_SUCCESS,
                payload: response.data,
            });
            console.log(response.data)
        }).catch(error => {
            dispatch({
                type: CREATE_CARDSET_FAIL,
                error: error.response,
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
            dispatch({
                type: RETRIEVE_CARDSETS,
                payload: response.data
            })
        }).catch(err => {console.log(err)})
}

export const updatecardset = (newTitle, newDescription, id) => (dispatch, getState) => {
    
    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;

    const body = {
        "id": id,
        "title": newTitle,
        "description": newDescription
    }

    axios.patch(`http://127.0.0.1:8000/indexapi/cardsets/${id}/`, body, {headers, })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: UPDATE_CARDSET,
                payload: response.data,
                id: id,
            })
        })
}

export const deletecardset = (id) => (dispatch, getState) => {

    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;

    const cardsets = getState().CRUD.cardsets;
    const delCardset = cardsets.filter(cardset => cardset.id == id);

    axios.delete(`http://127.0.0.1:8000/indexapi/cardsets/${id}/`, {headers, }
    ).then(response => {
        dispatch({
            type: DELETE_CARDSET,
            payload: id
        })
    })
        .catch(err => console.log(err));
}



// CARD ACTIONS -----------------------------------------------------------------------------------------------
export const createcard = (cardset, value, description) => dispatch => {
    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;

    const body = {
        "cardset": cardset,
        "value": value,
        "description": description
    }
    console.log(body);
    axios.post(`http://127.0.0.1:8000/indexapi/cards/`, body, {headers, })
        .then(response => {
            dispatch({
                type: CREATE_CARD_SUCCESS,
                payload: response.data,
            })
        }).catch(err => {
            dispatch({
                type: CREATE_CARD_FAIL,
                error: err,
            })
        })
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
            //console.log(id);
            //console.log(cards);
            dispatch({
                type: RETRIEVE_CARDS,
                payload: cards
            })
        }).catch(err => {console.log(err)})
}

export const updatecard = (id, newValue, newDescription) => (dispatch, getState) => {
    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;
    
    const body = {
        "id": id,
        "value": newValue,
        "description": newDescription
    }

    console.log('updating');
    axios.patch(`http://127.0.0.1:8000/indexapi/cards/${id}/`, body, {headers, })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: UPDATE_CARD,
                payload: response.data,
                id: id,
            })
        }).catch(error => console.log(error))
}

export const deletecard = (id) => dispatch => {

    let headers = {
        "Content-Type": "application/json",
    };
    
    const token = localStorage.getItem('token');
    headers["Authorization"] = `Token ${token}`;

    axios.delete(`http://127.0.0.1:8000/indexapi/cards/${id}/`, {headers, })
        .then(response => {
            dispatch({
                type: DELETE_CARD,
                payload: id,
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