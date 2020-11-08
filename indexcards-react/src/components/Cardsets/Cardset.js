import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Cardset.css';


const CardSet = (props) => {
    return (
        <Link className="link" to={"/cardset/" + props.title + "/" + props.id}>
            <div className="Cardset" >
                {props.title}
            </div>
        </Link>
    );
}

export default CardSet;