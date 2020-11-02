import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Cardset.css';

const CardSet = (props) => {
    return (
        <div className="Cardset" onClick={props.clicked}>
            {props.title}
        </div>
    );
}

export default CardSet;