import React from 'react';
import './Card.css';

const Card = (props) => {

    return (
        <div className="card" onClick={props.clicked}>
            <p className="cardText">{props.display}</p>
        </div>
    );
}

export default Card;