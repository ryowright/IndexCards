import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createcardset } from '../../actions/CRUD';


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
    };

    render () {
        const {title, description, isPrivate} = this.state;
        return (
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <input name="title" placeholder="Title" value={title} onChange={this.onChange} required />
                    <input name="description" placeholder="Description (Optional)" value={description} onChange={this.onChange} />
                    <input type="hidden" value={isPrivate} />
                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default connect(null, { createcardset })(CreateCardset);