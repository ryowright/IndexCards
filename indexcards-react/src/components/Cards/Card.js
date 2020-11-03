import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
    let flipped = false;
    //let display = null;

    let flipCard = () => {
        flipped = !flipped;
    }

    //if(flipped){
    //    display = props.description;
    //}
    //else{
    //    display = props.value;
    //}

    return (
        <div className="card" onClick={() => flipCard}>
            {flipped == true ? props.description : props.value}
        </div>
    );
}

export default Card;