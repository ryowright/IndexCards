import React from 'react';
import { Link } from 'react-router-dom';
import './Cardset.css';


const CardSet = (props) => {
    return (
        <Link className="link" to={"/cards/" + props.id + "/" + props.title}>
            <div className="Cardset" >
                {props.title}
            </div>
        </Link>
    );
}

export default CardSet;