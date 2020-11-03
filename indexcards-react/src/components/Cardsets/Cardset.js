import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Cards from '../Cards/Cards'
import './Cardset.css';


const CardSet = (props) => {
    return (
        <Link to={"/cardset/" + props.id}>
            <div className="Cardset" >
                {props.title}
            </div>
        </Link>
    );
}

export default CardSet;