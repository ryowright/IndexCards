import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createcardset } from '../../actions/CRUD';
import './Create.css';

class CreateCardset extends Component {
    state = {
        title: "",
        description: "",
        isPrivate: false
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createcardset(this.state.title, this.state.description, this.state.isPrivate);
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.length == event.target.maxLength) {
            alert("Maximum number of characters reached: 100.")
        }
    };

    render () {
        const {title, description, isPrivate} = this.state;
        return (
            <div className="create-cardset">
                <form method="post" onSubmit={this.handleSubmit}>
                    <input className="create-title" name="title" placeholder="Title" value={title} maxLength="100" onChange={this.onChange} required />
                    <input className="create-description" name="description" placeholder="Description (Optional)" value={description} onChange={this.onChange} maxLength="100" />
                    <input type="hidden" value={isPrivate} />
                    <button className="create-submit-btn" type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { createcardset })(CreateCardset);