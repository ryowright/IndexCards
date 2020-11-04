import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Card.css';

const Card = (props) => {

    return (
        <div className="card" onClick={props.clicked}>
            {props.show}
        </div>
    );
}

export default Card;