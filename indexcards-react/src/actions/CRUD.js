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
    axios.post("http://127.0.0.1:8000/indexapi/cardsets/", {"title": title, "description": description, "private": isPrivate}, tokenConfig())
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
            if (error.response.data.title) {
                console.log(error.response);
                alert("Title cannot exceed 100 characters.")
            }
        });
}

export const retrievecardsets = () => dispatch => {
    axios.get("http://127.0.0.1:8000/indexapi/cardsets/", tokenConfig())
        .then(response => {
            dispatch({
                type: RETRIEVE_CARDSETS,
                payload: response.data,
            })
        }).catch(error => console.log(error));
}


export const updatecardset = (newTitle, newDescription, id) => (dispatch, getState) => {
    const body = {
        "id": id,
        "title": newTitle,
        "description": newDescription
    }
    axios.patch(`http://127.0.0.1:8000/indexapi/cardsets/${id}/`, body, tokenConfig())
        .then(response => {
            dispatch({
                type: UPDATE_CARDSET,
                payload: response.data,
                id: id,
            })
        }).catch(error => {
            if (error.response.data.title) {
                console.log(error.response);
                alert("Title cannot exceed 100 characters.")
            }
        });
}


export const deletecardset = (id) => (dispatch, getState) => {
    //const cardsets = getState().CRUD.cardsets;
    //const delCardset = cardsets.filter(cardset => cardset.id == id);

    axios.delete(`http://127.0.0.1:8000/indexapi/cardsets/${id}/`, tokenConfig()
    ).then(response => {
        dispatch({
            type: DELETE_CARDSET,
            payload: id
        })
    }).catch(error => {
        alert(error.response);
        console.log(error)
    });
}



// CARD ACTIONS -----------------------------------------------------------------------------------------------
export const createcard = (cardset, value, description) => dispatch => {
    const body = {
        "cardset": cardset,
        "value": value,
        "description": description
    }
    console.log(body);
    axios.post(`http://127.0.0.1:8000/indexapi/cards/`, body, tokenConfig())
        .then(response => {
            dispatch({
                type: CREATE_CARD_SUCCESS,
                payload: response.data,
            })
        }).catch(error => {
            dispatch({
                type: CREATE_CARD_FAIL,
                error: error,
            });
            alert(error.response);
            console.log(error);
        })
}


export const retrievecards = (id) => dispatch => {
    let cards = []
    axios.get(`http://127.0.0.1:8000/indexapi/cards/`, tokenConfig())
        .then(response => {
            cards = response.data.filter(card => card.cardset == id)
            dispatch({
                type: RETRIEVE_CARDS,
                payload: cards
            })
        }).catch(error => console.log(error));
}


export const updatecard = (id, newValue, newDescription) => (dispatch, getState) => {
    const body = {
        "id": id,
        "value": newValue,
        "description": newDescription
    }

    console.log('updating');
    axios.patch(`http://127.0.0.1:8000/indexapi/cards/${id}/`, body, tokenConfig())
        .then(response => {
            console.log(response.data);
            dispatch({
                type: UPDATE_CARD,
                payload: response.data,
                id: id,
            })
        }).catch(error => {
            alert(error.response);
            console.log(error);
        })
}


export const deletecard = (id) => dispatch => {
    axios.delete(`http://127.0.0.1:8000/indexapi/cards/${id}/`, tokenConfig())
        .then(response => {
            dispatch({
                type: DELETE_CARD,
                payload: id,
            })
        }).catch(error => console.log(error));
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


export const tokenConfig = () => {
    const token = localStorage.getItem('token');

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