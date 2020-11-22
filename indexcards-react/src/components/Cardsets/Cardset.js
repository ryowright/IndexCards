import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletecardset, updatecardset, retrievecardsets } from '../../actions/CRUD';
import './Cardset.css';


class CardSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            title: this.props.title,
            description: this.props.desc,
            link: "/cards/" + this.props.id + "/" + this.props.title,
        }
    }

    toggleEdit = (event) => {
        event.preventDefault();
        let editMode = this.state.editMode;
        if (editMode) {
            this.setState({
                editMode: !editMode,
                link: "/cards/" + this.props.id + "/" + this.props.title,
            })
            this.props.updatecardset(this.state.title, this.state.description, this.props.id);

        } else {
            this.setState({
                editMode: !editMode,
                link: "",
            })
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        if (event.target.value.length == event.target.maxLength) {
            alert(`Maximum number of characters reached: ${event.target.maxLength}.`)
        }
    }

    render () {
        const {title, description, editMode, link} = this.state;
        return (
            <div className="cardset-container">
            <button className="delete-btn" onClick={() => this.props.deletecardset(this.props.id)}>Delete</button>
            <Link className="link" to={link}>
                <div className="cardset" >
                    <div className="title">
                        {editMode ? <input className="input-title" placeholder="Title" name="title" value={title} maxLength="100" onChange={this.onChange} required/> : title}
                    </div>
                    <div className="description">
                    {editMode ? <textarea className="input-description" placeholder="Description (Optional)" name="description" value={description} maxLength="300" onChange={this.onChange} /> : description}
                    </div>
                </div>
            </Link>
                {editMode ? 
                    <form method="post" onSubmit={this.toggleEdit}>
                        <button className="update-btn" type="submit">Confirm</button>
                    </form> : 
                    <button className="update-btn" onClick={this.toggleEdit}>Edit</button>}
            </div>
        );
    }   
}

export default connect(null, { deletecardset, updatecardset, retrievecardsets })(CardSet);

//<button className="update-btn" onClick={this.toggleEdit}>{editMode ? "Confirm" : "Edit"}</button>