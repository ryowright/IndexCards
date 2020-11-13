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

    toggleEdit = () => {
        let editMode = this.state.editMode;
        if (editMode) {
            this.setState({
                editMode: !editMode,
                link: "/cards/" + this.props.id + "/" + this.props.title,
            })
            this.props.updatecardset(this.state.title, this.state.description, this.props.id);
            //console.log('update');
            this.props.retrievecardsets();
            //console.log('retrieve');

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
    }

    render () {
        const {title, description, editMode, link} = this.state;
        return (
            <div className="cardset-container">
            <button className="delete-btn" onClick={() => this.props.deletecardset(this.props.id)}>Delete</button>
            <Link className="link" to={link}>
                <div className="Cardset" >
                    <div className="title">
                        {editMode ? <input name="title" value={title} onChange={this.onChange} required/> : title}
                    </div>
                    <div className="description">
                    {editMode ? <input name="description" value={description} onChange={this.onChange} /> : description}
                    </div>
                </div>
            </Link>
            <button className="update-btn" onClick={this.toggleEdit}>{editMode ? "Confirm" : "Edit"}</button>
            </div>
        );
    }   
}

export default connect(null, { deletecardset, updatecardset, retrievecardsets })(CardSet);