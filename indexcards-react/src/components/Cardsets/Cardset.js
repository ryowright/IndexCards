import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletecardset, retrievecardsets } from '../../actions/CRUD';
import './Cardset.css';


const CardSet = (props) => {

    return (
        <div className="cardset-container">
        <button className="delete-btn" onClick={() => props.deletecardset(props.id)}>Delete</button>
        <Link className="link" to={"/cards/" + props.id + "/" + props.title}>
            <div className="Cardset" >
                <div className="title">
                    {props.title}
                </div>
                <div className="description">
                    {props.desc}
                </div>
            </div>
        </Link>
        </div>
    );
}

export default connect(null, { deletecardset, retrievecardsets })(CardSet);